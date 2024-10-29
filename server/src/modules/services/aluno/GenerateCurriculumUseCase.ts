import fs from 'fs';
import path from 'path';
import html_to_pdf from 'html-pdf-node';
import axios from 'axios';
import { prisma } from '../../../prisma/client';
import { uploadToMinio } from '../../../minioService';
import { minioClient } from '../../../minioService';
import { AppError } from '../../../errors/error';

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

        const { name, curriculo } = aluno;
        const title = aluno.turmas[0]?.turma?.curso?.name ? `Técnico(a) em ${aluno.turmas[0].turma.curso.name}` : "Estudante";
        const academicTraining = aluno.cursosExtracurriculares
        .map(course => {
            const inicioFormatado = new Date(course.inicio).toLocaleDateString('pt-BR');
            const fimFormatado = new Date(course.fim).toLocaleDateString('pt-BR');
            return `<li>${course.descricao} - ${course.instituicao} - De ${inicioFormatado} a ${fimFormatado}</li>`;
        })
        .join("");


        const bucketName = 'boot';
        var imageName = aluno.imagem as string;
    
        const objectExists = await minioClient.statObject(bucketName, imageName);
        if(!objectExists){
            imageName = "assets/img/default_profile_image.png"
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
                .replace('{{endereco}}', aluno.endereco)
                .replace('{{cidade}}', "Rio Grande da Serra")
                .replace('{{numero}}', "11 97134-5610")
                .replace('{{rm}}', "2228")
                .replace('{{email}}', email)
                .replace('{{titulo}}', "Técnico em Desenvolvimento de sistemas")
                .replace('{{aboutMe}}', curriculo || "Sem informações adicionais")
                .replace('{{academicTraining}}', " ")
                .replace('{{img}}', imageBase64);


        const file = { content: html };

        const pdfBuffer = await html_to_pdf.generatePdf(file, { format: 'A4' });

        const tempFilePath = path.join(__dirname, 'curriculo_temp.pdf');
        fs.writeFileSync(tempFilePath, pdfBuffer);

        const pdfPath = `aluno/${aluno.id}/curriculo.pdf`;
        await uploadToMinio(bucketName, pdfPath, tempFilePath);

        fs.unlinkSync(tempFilePath);

        const url = await minioClient.presignedUrl('GET', bucketName, pdfPath, 24 * 60 * 60);
        return { message: 'Currículo gerado com sucesso!', url };
    }
}
