import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { prisma } from '../../../prisma/client';
import { minioClient } from '../../../minioService';
import { AppError } from '../../../errors/error';
import { Endereco } from '../../interfaces/alunoDTOs';
import puppeteer from 'puppeteer'; // Adicionando importação do Puppeteer

export class GenerateCurriculumUseCase {
    async execute(email: string) {
        const aluno = await prisma.aluno.findUnique({
            where: { email },
            include: {
                turmas: {
                    take: 1,
                    include: {
                        turma: { include: { curso: true } }
                    },
                },
                cursosExtracurriculares: { take: 3, orderBy: { inicio: 'asc' } },
            },
        });

        if (!aluno) throw new AppError("Aluno não encontrado");

        if (aluno.endereco && aluno.rm && aluno.dataNascimento) {
            const hoje = new Date();
            const dataNascimento = new Date(aluno.dataNascimento);
            let idade = hoje.getFullYear() - dataNascimento.getFullYear();
            const mesAtual = hoje.getMonth() + 1;
            const mesNascimento = dataNascimento.getMonth() + 1;

            if (
                mesAtual < mesNascimento ||
                (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())
            ) {
                idade--;
            }

            const endereco = JSON.parse(aluno.endereco) as Endereco;

            const { name, curriculo } = aluno;
            const title = aluno.turmas[0]?.turma?.curso?.name ? `Técnico(a) em ${aluno.turmas[0].turma.curso.name}` : "Estudante";
            const academicTraining = aluno.cursosExtracurriculares
                .map(course => {
                    const inicioFormatado = new Date(course.inicio).toLocaleDateString('pt-BR');
                    const fimFormatado = new Date(course.fim).toLocaleDateString('pt-BR');
                    return `
            <li>
                <ul>
                    <li><p><b>Instituição: </b>${course.instituicao}</p></li>
                    <li><p><b>Descrição: </b>${course.descricao}</p></li>
                    <li><p><b>Início: </b>${inicioFormatado} <b>Conclusão:</b>${fimFormatado}</p></li>
                </ul>
            </li>`;
                })
                .join("");

            const bucketName = 'boot';
            var imageName = aluno.imagem as string;

            const objectExists = await minioClient.statObject(bucketName, imageName);
            if (!objectExists) {
                imageName = "assets/img/default_profile_image.png";
            }
            const imageURL = await minioClient.presignedUrl('GET', bucketName, imageName, 24 * 60 * 60);

            const imageResponse = await axios.get(imageURL, { responseType: 'arraybuffer' });
            const imageBase64 = `data:image/png;base64,${Buffer.from(imageResponse.data).toString('base64')}`;

            const cssPath = path.join(__dirname, '../../../pdf/style.css');
            const styleContent = fs.readFileSync(cssPath, 'utf-8');

            const templatePath = path.join(__dirname, '../../../pdf/curriculum_template.html');
            let html = fs.readFileSync(templatePath, 'utf8');
            html = html.replace('{{name}}', name)
                .replace('{{style}}', styleContent)
                .replace('{{endereco}}', endereco.rua + ", Nº " + endereco.numero)
                .replace('{{cidade}}', endereco.municipio + " - " + endereco.estado)
                .replace('{{numero}}', aluno.telefone)
                .replace('{{idade}}', idade + " anos")
                .replace('{{rm}}', aluno.rm)
                .replace('{{email}}', email)
                .replace('{{titulo}}', title)
                .replace('{{aboutMe}}', curriculo || "Sem informações adicionais")
                .replace('{{academicTraining}}', academicTraining)
                .replace('{{img}}', imageBase64);

            // Aqui começamos a usar o Puppeteer
            const browser = await puppeteer.launch({
                executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, // Usar o caminho do Chrome
                headless: true, // Se quiser ver o navegador em ação, coloque como false
                args: ['--no-sandbox', '--disable-setuid-sandbox'], // Adicionar flags
            });

            const page = await browser.newPage();
            await page.setContent(html);
            const pdfBuffer = await page.pdf({ format: 'A4' });

            await browser.close();

            // Caminho do arquivo temporário para o PDF
            const tempFilePath = path.join(__dirname, 'curriculo_temp.pdf');
            fs.writeFileSync(tempFilePath, pdfBuffer);

            // Função de upload para o MinIO
            try {
                const pdfPath = `aluno/${aluno.rm}/curriculo.pdf`;
                await this.uploadToMinio(bucketName, pdfPath, tempFilePath);
                fs.unlinkSync(tempFilePath); // Remover o arquivo temporário após o upload

                const url = await minioClient.presignedUrl('GET', bucketName, pdfPath, 24 * 60 * 60);
                return { message: 'Currículo gerado com sucesso!', url };
            } catch (error) {
                console.error('Falha ao fazer upload do arquivo:', error);
                throw new AppError("Falha ao fazer upload do arquivo no MinIO.");
            }
        }
    }

    // Implementação da função de upload para o MinIO
    async uploadToMinio(bucketName, objectName, filePath) {
        try {
            await minioClient.fPutObject(bucketName, objectName, filePath);
            console.log(`Arquivo enviado com sucesso: ${objectName}`);
        } catch (err) {
            console.error('Error uploading file:', err);
            throw new AppError('Erro ao fazer upload do arquivo', err); // Para tratamento de erros
        }
    }
}