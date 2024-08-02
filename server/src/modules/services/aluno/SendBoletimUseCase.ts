// import puppeteerNormal from 'puppeteer';
// import puppeteer from 'puppeteer-extra';
// import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
// import fs from 'fs';
// import path from 'path';
// import pdf from 'pdf-parse';
import axios from 'axios';
// import { getExecutablePath } from 'puppeteerNormal';

import { prisma } from "../../../prisma/client";
import { SendNotasDTO } from "../../interfaces/alunoDTOs";
import { AppError } from "../../../errors/error";
import { clearUploads } from '../shared/helpers/helpers';

// Configure o plugin Recaptcha
// puppeteer.use(
//   RecaptchaPlugin({
//     provider: {
//       id: '2captcha',
//       token: process.env.CAPTCHA2_ID || '', // Certifique-se de que o token está definido
//     },
//   })
// );

export class SendBoletimUseCase {
  async execute({ alunoId, boletim }: SendNotasDTO) {
    if (!alunoId) {
      throw new AppError('ID do aluno não fornecido.');
    }

    if (!boletim || !boletim.path) {
      throw new AppError('Arquivo do boletim não fornecido.');
    }

    const aluno = await prisma.aluno.findUnique({
      where: {
        id: alunoId,
      },
    });

    if (!aluno) {
      throw new AppError('Aluno não encontrado.');
    }

    // const boletimPath = path.resolve(boletim.path);

    // const boletimBuffer = fs.readFileSync(boletimPath);

    // const authUrl = await this.extractAuthUrlFromPdf(boletimBuffer);

    // const browser = await puppeteer.launch({
    //     headless: false,
    // });

    
    // const page = await browser.newPage();
    
    // await page.goto(authUrl);
    
    // setTimeout(async () => {
    //     const { solved, error } = await page.solveRecaptchas();
    //     console.log("Here2");
    
    //     if (!solved) {
    //       throw new AppError('Falha ao resolver CAPTCHA: ' + error);
    //     } else {
    //       console.log('Captcha resolvido com sucesso, url: ' + authUrl);
    //     }
    
    //     await page.waitForSelector('#btnValidar');
    //     await page.click('#btnValidar');
    // }, 10000);

    // const downloadUrl = await page.evaluate(() => {
    //     const linkElement = document.querySelector('a#downloadLink') as HTMLAnchorElement | null;
    //     return linkElement ? linkElement.href : '';
    // });
    

    // const response = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
    // const downloadedFilePath = path.join(__dirname, 'downloads', 'downloaded_boletim.pdf');
    // fs.writeFileSync(downloadedFilePath, response.data);

    // // Comparar os dois arquivos PDF
    // const downloadedBoletimBuffer = fs.readFileSync(downloadedFilePath);

    // if (!boletimBuffer.equals(downloadedBoletimBuffer)) {
    //     throw new AppError("Os arquivos enviados não coincidem.");
    // }

    // Extrair notas do boletim
    // const notas = this.extractNotasFromBoletim(boletimBuffer);

    // Fechar o navegador
    // await browser.close();

    await clearUploads();

  }

//   async extractAuthUrlFromPdf(buffer: Buffer): Promise<string> {
//     const data = await pdf(buffer);
//     const text = data.text;

//     const urlMatch = text.match(/https:\/\/nsa\.cps\.sp\.gov\.br\?a=[a-z0-9-]+/i);
//     if (!urlMatch) {
//       throw new AppError('URL de autenticação não encontrado no boletim.');
//     }

//     return urlMatch[0];
//   }

  extractNotasFromBoletim(buffer: Buffer) {
    return [
    //   { materia: 'Matemática', nota: 'MB' },
    //   { materia: 'Português', nota: 'MB' },
    ];
  }
}
