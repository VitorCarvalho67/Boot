export function generateRegisterEmpresaEmail(name: string, cnpj: string, token: string): string {
    return `<!DOCTYPE html>
        <html>
        <head>
            <style>
            *{
                overflow-x: hidden;
                max-width: 100%;
            }
            .logo{
                text-align: center;
            }
            .email-body {
                font-family: 'Arial', sans-serif;
                color: #555;
                padding: 10px;
                margin: 0;
                width: 100%
            }
            .email-container {
                padding: 5px 20px 20px 20px;
                max-width: 95%;
                margin: auto;
            }
            .header {
                background-color: #4a90e2;
                color: #ffffff;
                padding: 10px 20px;
                text-align: center;
            }
            .verification-code {
                font-size: 50px;
                font-weight: bold;
                color: #000;
                text-align: center;
                margin: 20px 0;
            }
            .instructions {
                text-align: center;
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 20px;
            }
            .footer {
                font-size: 12px;
                text-align: center;
                color: #999;
                margin-top: 20px;
                border-top: 1px solid #eeeeee;
                padding-top: 10px;
            }

            </style>
        </head>
        <body>
            <div class="email-body">
                <div class="header">
                    Valide seu E-mail Empresarial
                </div>
                <div class="logo" width="100%" align="center">
                    <img src="https://github.com/VitorCarvalho67/Boot/assets/102667323/dd1fc8b6-12ac-4b2a-8e20-52145bfac526" alt="Logo da BOOT" width="400px">
                </div>
                <div class="email-container">
                    <p class="instructions" width="400px">
                        Olá ${name}! Este email serve para garantir a segurança e privacidade da empresa ao se cadastrar em nossa plataforma. Por favor, use o código abaixo para completar seu processo de registro:
                    </p>
                    <div class="verification-code">
                        ${token}
                    </div>
                    <p class="instructions">
                        Este código é válido por 10 minutos. Não compartilhe este código com ninguém.
                        Caso não tenha solicitado esse código por favor ignore este e-mail.
                        Solicitação gerada pelo CNPJ ${cnpj}.
                    </p>
                    <div class="footer">
                        Obrigado por usar a plataforma da <a href="${process.env.URL}">BOOT</a>, seu pontapé para o mercado de trabalho!
                    </div>
                </div>
            </div>
        </body>
        </html>`;
}