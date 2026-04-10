import { PrismaClient, Turno, Cargo, Mencao } from '@prisma/client';
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    const salt = bcrypt.genSaltSync(10);
    const defaultPassword = bcrypt.hashSync('123456', salt);

    // ── Admin ──
    const admin = await prisma.admin.create({
        data: {
            name: 'Administrador',
            email: 'admin@etec.sp.gov.br',
            password: defaultPassword,
        },
    });
    console.log('Admin criado:', admin.name);

    // ── Professores ──
    const prof1 = await prisma.professor.create({
        data: {
            name: 'Carlos Eduardo Silva',
            email: 'carlos.silva@etec.sp.gov.br',
            password: defaultPassword,
            tituloPrincipal: 'Mestre em Ciência da Computação',
            curriculo: 'Graduado em Ciência da Computação pela USP, Mestrado pela UNICAMP. 10 anos de experiência em desenvolvimento web e mobile. Certificações: AWS Solutions Architect, Oracle Java SE.',
            validated: true,
            tentativasRestantes: 5,
        },
    });

    const prof2 = await prisma.professor.create({
        data: {
            name: 'Ana Paula Oliveira',
            email: 'ana.oliveira@etec.sp.gov.br',
            password: defaultPassword,
            tituloPrincipal: 'Doutora em Engenharia de Software',
            curriculo: 'Graduada em Sistemas de Informação pela UNESP, Doutorado pela USP. Pesquisadora em metodologias ágeis e qualidade de software. Autora de 15 artigos publicados.',
            validated: true,
            tentativasRestantes: 5,
        },
    });

    const prof3 = await prisma.professor.create({
        data: {
            name: 'Roberto Mendes',
            email: 'roberto.mendes@etec.sp.gov.br',
            password: defaultPassword,
            tituloPrincipal: 'Especialista em Redes de Computadores',
            curriculo: 'Graduado em Engenharia da Computação pela FATEC, Especialização em Redes pela PUC-SP. Certificações: CCNA, CCNP, CompTIA Network+. 8 anos de experiência em infraestrutura.',
            validated: true,
            tentativasRestantes: 5,
        },
    });
    console.log('Professores criados: 3');

    // ── Coordenadores ──
    const coord1 = await prisma.coordenador.create({
        data: { name: 'Carlos Eduardo Silva', professorId: prof1.id },
    });

    const coord2 = await prisma.coordenador.create({
        data: { name: 'Ana Paula Oliveira', professorId: prof2.id },
    });
    console.log('Coordenadores criados: 2');

    // ── Funcionários ──
    const func1 = await prisma.funcionario.create({
        data: {
            name: 'Maria Souza',
            email: 'maria.souza@etec.sp.gov.br',
            password: defaultPassword,
            cargo: Cargo.GESTAO,
            validated: true,
            tentativasRestantes: 5,
        },
    });

    const func2 = await prisma.funcionario.create({
        data: {
            name: 'José Santos',
            email: 'jose.santos@etec.sp.gov.br',
            password: defaultPassword,
            cargo: Cargo.ADMINISTRACAO,
            validated: true,
            tentativasRestantes: 5,
        },
    });

    const func3 = await prisma.funcionario.create({
        data: {
            name: 'Fernanda Lima',
            email: 'fernanda.lima@etec.sp.gov.br',
            password: defaultPassword,
            cargo: Cargo.ORIENTACAO,
            validated: true,
            tentativasRestantes: 5,
        },
    });

    const func4 = await prisma.funcionario.create({
        data: {
            name: 'Ricardo Barbosa',
            email: 'ricardo.barbosa@etec.sp.gov.br',
            password: defaultPassword,
            cargo: Cargo.DIRECAO,
            validated: true,
            tentativasRestantes: 5,
        },
    });
    console.log('Funcionários criados: 4');

    // ── Matérias ──
    const materias = await Promise.all([
        prisma.materia.create({ data: { name: 'Programação Web' } }),
        prisma.materia.create({ data: { name: 'Banco de Dados' } }),
        prisma.materia.create({ data: { name: 'Redes de Computadores' } }),
        prisma.materia.create({ data: { name: 'Sistemas Operacionais' } }),
        prisma.materia.create({ data: { name: 'Lógica de Programação' } }),
        prisma.materia.create({ data: { name: 'Inglês Técnico' } }),
        prisma.materia.create({ data: { name: 'Matemática Aplicada' } }),
        prisma.materia.create({ data: { name: 'Gestão de Projetos' } }),
    ]);
    console.log('Matérias criadas:', materias.length);

    // ── Cursos ──
    const cursoDS = await prisma.curso.create({
        data: {
            name: 'Desenvolvimento de Sistemas',
            turno: Turno.MANHA,
            duracao: '3 semestres',
            coordenadorId: coord1.id,
        },
    });

    const cursoRedes = await prisma.curso.create({
        data: {
            name: 'Redes de Computadores',
            turno: Turno.NOITE,
            duracao: '3 semestres',
            coordenadorId: coord2.id,
        },
    });

    const cursoAdm = await prisma.curso.create({
        data: {
            name: 'Administração',
            turno: Turno.TARDE,
            duracao: '3 semestres',
            coordenadorId: coord1.id,
        },
    });
    console.log('Cursos criados: 3');

    // ── CursoMateria ──
    await prisma.cursoMateria.createMany({
        data: [
            { cursoId: cursoDS.id, materiaId: materias[0].id },
            { cursoId: cursoDS.id, materiaId: materias[1].id },
            { cursoId: cursoDS.id, materiaId: materias[4].id },
            { cursoId: cursoDS.id, materiaId: materias[5].id },
            { cursoId: cursoDS.id, materiaId: materias[7].id },
            { cursoId: cursoRedes.id, materiaId: materias[2].id },
            { cursoId: cursoRedes.id, materiaId: materias[3].id },
            { cursoId: cursoRedes.id, materiaId: materias[5].id },
            { cursoId: cursoAdm.id, materiaId: materias[6].id },
            { cursoId: cursoAdm.id, materiaId: materias[7].id },
            { cursoId: cursoAdm.id, materiaId: materias[5].id },
        ],
    });
    console.log('Matérias vinculadas aos cursos');

    // ── Turmas ──
    const turmaDS1 = await prisma.turma.create({
        data: { inicio: '2025-02-01', fim: '2025-07-15', cursoId: cursoDS.id },
    });
    const turmaDS2 = await prisma.turma.create({
        data: { inicio: '2025-08-01', fim: '2025-12-15', cursoId: cursoDS.id },
    });
    const turmaRedes1 = await prisma.turma.create({
        data: { inicio: '2025-02-01', fim: '2025-07-15', cursoId: cursoRedes.id },
    });
    const turmaAdm1 = await prisma.turma.create({
        data: { inicio: '2025-02-01', fim: '2025-07-15', cursoId: cursoAdm.id },
    });
    console.log('Turmas criadas: 4');

    // ── Alunos ──
    const alunosData = [
        { name: 'Lucas Pereira', email: 'lucas.pereira@etec.sp.gov.br', rm: '22001', dataNascimento: new Date('2005-03-15'), endereco: JSON.stringify({ cep: '01010-000', rua: 'Rua das Flores', numero: '120', municipio: 'São Paulo', estado: 'SP' }), telefone: '(11) 98001-1001', sobre: 'Estudante de DS, apaixonado por front-end e UI/UX Design. Participo de hackathons e meetups de tecnologia.', curriculo: 'Conhecimentos em HTML, CSS, JavaScript, Vue.js e Figma. Participação no Hackathon ETEC 2024 (2º lugar). Inglês intermediário.' },
        { name: 'Beatriz Costa', email: 'beatriz.costa@etec.sp.gov.br', rm: '22002', dataNascimento: new Date('2005-07-22'), endereco: JSON.stringify({ cep: '01430-000', rua: 'Av. Brasil', numero: '450', municipio: 'São Paulo', estado: 'SP' }), telefone: '(11) 98002-2002', sobre: 'Futura dev back-end. Amo resolver problemas com lógica e algoritmos. Sempre buscando aprender algo novo.', curriculo: 'Conhecimentos em Node.js, TypeScript e PostgreSQL. Curso de Python na Alura. Monitora de Lógica de Programação.' },
        { name: 'Gabriel Almeida', email: 'gabriel.almeida@etec.sp.gov.br', rm: '22003', dataNascimento: new Date('2004-11-08'), endereco: JSON.stringify({ cep: '01301-000', rua: 'Rua Consolação', numero: '789', municipio: 'São Paulo', estado: 'SP' }), telefone: '(11) 98003-3003', sobre: 'Desenvolvedor full-stack em formação. Gosto de criar projetos pessoais e contribuir com open source.', curriculo: 'Projetos pessoais com React e Express. Contribuição em repositórios open source. Curso de Git e GitHub pela DIO.' },
        { name: 'Isabela Ferreira', email: 'isabela.ferreira@etec.sp.gov.br', rm: '22004', dataNascimento: new Date('2005-01-30'), endereco: JSON.stringify({ cep: '01305-100', rua: 'Rua Augusta', numero: '1200', municipio: 'São Paulo', estado: 'SP' }), telefone: '(11) 98004-4004', sobre: 'Interessada em banco de dados e análise de dados. Sonho em trabalhar com ciência de dados.', curriculo: 'Conhecimentos em SQL, MySQL, Excel avançado e Power BI. Curso de Data Analytics no Google. Estágio voluntário em ONG.' },
        { name: 'Matheus Ribeiro', email: 'matheus.ribeiro@etec.sp.gov.br', rm: '22005', dataNascimento: new Date('2005-05-12'), endereco: JSON.stringify({ cep: '04101-300', rua: 'Rua Vergueiro', numero: '3100', municipio: 'São Paulo', estado: 'SP' }), telefone: '(11) 98005-5005', sobre: 'Apaixonado por mobile e IoT. Desenvolvendo apps com React Native no tempo livre.', curriculo: 'Conhecimentos em React Native, Firebase e Arduino. Projeto de automação residencial com ESP32. Inglês avançado.' },
        { name: 'Juliana Santos', email: 'juliana.santos@etec.sp.gov.br', rm: '22006', dataNascimento: new Date('2004-09-18'), endereco: JSON.stringify({ cep: '01046-000', rua: 'Av. Ipiranga', numero: '200', municipio: 'São Paulo', estado: 'SP' }), telefone: '(11) 98006-6006', sobre: 'Estudante de Redes, focada em cibersegurança. Participo de CTFs e desafios de segurança.', curriculo: 'Certificação CompTIA Security+ (em andamento). Participação em CTF HackTheBox. Conhecimentos em Linux, Wireshark e Nmap.' },
        { name: 'Pedro Henrique', email: 'pedro.henrique@etec.sp.gov.br', rm: '22007', dataNascimento: new Date('2005-02-25'), endereco: JSON.stringify({ cep: '01503-010', rua: 'Rua Liberdade', numero: '80', municipio: 'São Paulo', estado: 'SP' }), telefone: '(11) 98007-7007', sobre: 'Futuro administrador de redes. Gosto de configurar servidores e entender protocolos.', curriculo: 'Conhecimentos em TCP/IP, DNS, DHCP, VLANs. Laboratório de redes em casa com MikroTik. Curso CCNA módulo 1 concluído.' },
        { name: 'Larissa Martins', email: 'larissa.martins@etec.sp.gov.br', rm: '22008', dataNascimento: new Date('2005-08-05'), endereco: JSON.stringify({ cep: '01426-000', rua: 'Rua Oscar Freire', numero: '550', municipio: 'São Paulo', estado: 'SP' }), telefone: '(11) 98008-8008', sobre: 'Estudante de Administração com foco em gestão de TI. Acredito que tecnologia e gestão andam juntas.', curriculo: 'Conhecimentos em Excel, Power BI, Scrum e Kanban. Certificação Google Project Management. Estágio em empresa júnior.' },
        { name: 'Rafael Nunes', email: 'rafael.nunes@etec.sp.gov.br', rm: '22009', dataNascimento: new Date('2004-12-10'), endereco: JSON.stringify({ cep: '05401-300', rua: 'Av. Rebouças', numero: '1500', municipio: 'São Paulo', estado: 'SP' }), telefone: '(11) 98009-9009', sobre: 'Empreendedor em formação. Quero abrir minha própria startup de tecnologia após a formatura.', curriculo: 'Conhecimentos em gestão financeira, marketing digital e e-commerce. Curso de Empreendedorismo pelo SEBRAE. Projeto de startup no Startup Weekend.' },
        { name: 'Camila Rocha', email: 'camila.rocha@etec.sp.gov.br', rm: '22010', dataNascimento: new Date('2005-04-20'), endereco: JSON.stringify({ cep: '01414-000', rua: 'Rua Haddock Lobo', numero: '300', municipio: 'São Paulo', estado: 'SP' }), telefone: '(11) 98010-0010', sobre: 'Dev front-end apaixonada por acessibilidade e design inclusivo. Todo site deveria ser acessível.', curriculo: 'Conhecimentos em Vue.js, SASS, acessibilidade web (WCAG). Curso de UX Design pela Google. Projeto voluntário de site acessível para ONG.' },
    ];

    const alunos = [];
    for (const a of alunosData) {
        const aluno = await prisma.aluno.create({
            data: {
                name: a.name,
                email: a.email,
                password: defaultPassword,
                rm: a.rm,
                dataNascimento: a.dataNascimento,
                endereco: a.endereco,
                telefone: a.telefone,
                sobre: a.sobre,
                curriculo: a.curriculo,
                validated: true,
                tentativasRestantes: 5,
            },
        });
        alunos.push(aluno);
    }
    console.log('Alunos criados:', alunos.length);

    // ── AlunoTurma ──
    await prisma.alunoTurma.createMany({
        data: [
            { alunoId: alunos[0].id, turmaId: turmaDS1.id },
            { alunoId: alunos[1].id, turmaId: turmaDS1.id },
            { alunoId: alunos[2].id, turmaId: turmaDS1.id },
            { alunoId: alunos[3].id, turmaId: turmaDS2.id },
            { alunoId: alunos[4].id, turmaId: turmaDS2.id },
            { alunoId: alunos[5].id, turmaId: turmaRedes1.id },
            { alunoId: alunos[6].id, turmaId: turmaRedes1.id },
            { alunoId: alunos[7].id, turmaId: turmaAdm1.id },
            { alunoId: alunos[8].id, turmaId: turmaAdm1.id },
            { alunoId: alunos[9].id, turmaId: turmaDS1.id },
        ],
    });
    console.log('Alunos matriculados nas turmas');

    // ── Empresas ──
    const emp1 = await prisma.empresa.create({
        data: {
            name: 'Tech Solutions Ltda',
            email: 'contato@techsolutions.com.br',
            password: defaultPassword,
            cnpj: '12345678000190',
            endereco: 'Av. Paulista, 1000 - 12º andar - Bela Vista, São Paulo/SP - CEP 01310-100',
            telefone: '(11) 3000-1234',
            site: 'https://techsolutions.com.br',
            patrocinador: true,
            validated: true,
            tentativasRestantes: 5,
        },
    });

    const emp2 = await prisma.empresa.create({
        data: {
            name: 'DataCore Sistemas',
            email: 'rh@datacore.com.br',
            password: defaultPassword,
            cnpj: '98765432000155',
            endereco: 'Rua Augusta, 500 - 5º andar - Consolação, São Paulo/SP - CEP 01304-001',
            telefone: '(11) 3000-5678',
            site: 'https://datacore.com.br',
            patrocinador: false,
            validated: true,
            tentativasRestantes: 5,
        },
    });

    const emp3 = await prisma.empresa.create({
        data: {
            name: 'CloudNet Infraestrutura',
            email: 'vagas@cloudnet.com.br',
            password: defaultPassword,
            cnpj: '11223344000177',
            endereco: 'Rua Haddock Lobo, 200 - 3º andar - Cerqueira César, São Paulo/SP - CEP 01414-000',
            telefone: '(11) 3000-9012',
            site: 'https://cloudnet.com.br',
            patrocinador: true,
            validated: true,
            tentativasRestantes: 5,
        },
    });
    console.log('Empresas criadas: 3');

    // ── Vagas ──
    await prisma.vaga.create({
        data: {
            titulo: 'Estagiário Front-end',
            cursoId: cursoDS.id,
            empresaId: emp1.id,
            cadastradorId: func1.id,
            requisitos: JSON.stringify(['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Git']),
            beneficios: JSON.stringify(['VT', 'VR', 'Seguro de vida', 'Day off aniversário']),
            remuneracao: 'R$ 1.200,00',
            cargaHoraria: '6h',
            entrada: '08:00',
            saida: '14:00',
            status: 'DISPONIVEL',
            descricao: 'Desenvolvimento de interfaces web responsivas com Vue.js e TypeScript. Sprints ágeis e code reviews.',
        },
    });

    await prisma.vaga.create({
        data: {
            titulo: 'Estagiário Back-end',
            cursoId: cursoDS.id,
            empresaId: emp2.id,
            cadastradorId: func1.id,
            requisitos: JSON.stringify(['Node.js', 'TypeScript', 'SQL', 'REST API', 'Git']),
            beneficios: JSON.stringify(['VT', 'VR', 'PLR', 'Gympass', 'Horário flexível']),
            remuneracao: 'R$ 1.400,00',
            cargaHoraria: '6h',
            entrada: '09:00',
            saida: '15:00',
            status: 'DISPONIVEL',
            descricao: 'APIs REST com Node.js/Express e PostgreSQL. Microsserviços e documentação com Swagger.',
        },
    });

    await prisma.vaga.create({
        data: {
            titulo: 'Estagiário de Redes',
            cursoId: cursoRedes.id,
            empresaId: emp3.id,
            cadastradorId: func2.id,
            requisitos: JSON.stringify(['TCP/IP', 'Linux', 'Firewall', 'VLAN', 'Roteamento']),
            beneficios: JSON.stringify(['VT', 'VR', 'Custeio de certificações Cisco']),
            remuneracao: 'R$ 1.100,00',
            cargaHoraria: '6h',
            entrada: '13:00',
            saida: '19:00',
            status: 'DISPONIVEL',
            descricao: 'Suporte a redes corporativas. Monitoramento Zabbix, switches e roteadores.',
        },
    });
    console.log('Vagas criadas: 3');

    // ── Atividades ──
    const atv1 = await prisma.atividade.create({
        data: {
            title: 'Projeto Integrador - Loja Virtual',
            descricao: 'Desenvolver uma loja virtual completa com catálogo de produtos, carrinho de compras, sistema de pagamento simulado e painel administrativo. Utilizar Vue.js no front-end e Node.js/Express no back-end com banco de dados MySQL.',
            professorId: prof1.id,
        },
    });

    const atv2 = await prisma.atividade.create({
        data: {
            title: 'Configuração de Rede Local',
            descricao: 'Projetar e configurar uma rede local corporativa com segmentação de VLANs, servidor DHCP, DNS local e firewall. Documentar a topologia de rede e realizar testes de conectividade e performance.',
            professorId: prof3.id,
        },
    });

    const atv3 = await prisma.atividade.create({
        data: {
            title: 'Seminário de Banco de Dados',
            descricao: 'Apresentação em grupo sobre normalização de banco de dados (1FN, 2FN, 3FN), criação de índices, views e stored procedures. Demonstrar otimização de consultas SQL com exemplos práticos usando MySQL.',
            professorId: prof2.id,
        },
    });
    console.log('Atividades criadas: 3');

    // ── AlunoAtividade ──
    await prisma.alunoAtividade.createMany({
        data: [
            { alunoId: alunos[0].id, atividadeId: atv1.id, mencao: Mencao.MB },
            { alunoId: alunos[1].id, atividadeId: atv1.id, mencao: Mencao.B },
            { alunoId: alunos[2].id, atividadeId: atv1.id, mencao: Mencao.B },
            { alunoId: alunos[9].id, atividadeId: atv1.id, mencao: Mencao.MB },
            { alunoId: alunos[3].id, atividadeId: atv3.id, mencao: Mencao.MB },
            { alunoId: alunos[4].id, atividadeId: atv3.id, mencao: Mencao.R },
            { alunoId: alunos[5].id, atividadeId: atv2.id, mencao: Mencao.MB },
            { alunoId: alunos[6].id, atividadeId: atv2.id, mencao: Mencao.B },
            { alunoId: alunos[7].id, atividadeId: atv3.id, mencao: Mencao.B },
            { alunoId: alunos[8].id, atividadeId: atv3.id, mencao: Mencao.R },
        ],
    });
    console.log('Menções atribuídas aos alunos');

    // ── Notas ──
    const notasData: { alunoId: string; materiaId: string; bimestre: number; ano: number; mencao: Mencao }[] = [];
    const mencoesPool: Mencao[] = [Mencao.MB, Mencao.B, Mencao.B, Mencao.R, Mencao.MB, Mencao.B];

    // DS alunos (turma 1): materias de DS
    const dsAlunos = [alunos[0], alunos[1], alunos[2], alunos[9]];
    const dsMateriasIds = [materias[0].id, materias[1].id, materias[4].id, materias[5].id, materias[7].id];

    // DS alunos (turma 2)
    const dsAlunos2 = [alunos[3], alunos[4]];

    // Redes alunos
    const redesAlunos = [alunos[5], alunos[6]];
    const redesMateriasIds = [materias[2].id, materias[3].id, materias[5].id];

    // Adm alunos
    const admAlunos = [alunos[7], alunos[8]];
    const admMateriasIds = [materias[6].id, materias[7].id, materias[5].id];

    let idx = 0;

    // Notas DS turma 1
    for (const aluno of dsAlunos) {
        for (const materiaId of dsMateriasIds) {
            for (let bimestre = 1; bimestre <= 4; bimestre++) {
                notasData.push({ alunoId: aluno.id, materiaId, bimestre, ano: 2025, mencao: mencoesPool[idx % mencoesPool.length] });
                idx++;
            }
        }
    }

    // Notas DS turma 2
    for (const aluno of dsAlunos2) {
        for (const materiaId of dsMateriasIds) {
            for (let bimestre = 1; bimestre <= 4; bimestre++) {
                notasData.push({ alunoId: aluno.id, materiaId, bimestre, ano: 2025, mencao: mencoesPool[idx % mencoesPool.length] });
                idx++;
            }
        }
    }

    // Notas Redes
    for (const aluno of redesAlunos) {
        for (const materiaId of redesMateriasIds) {
            for (let bimestre = 1; bimestre <= 4; bimestre++) {
                notasData.push({ alunoId: aluno.id, materiaId, bimestre, ano: 2025, mencao: mencoesPool[idx % mencoesPool.length] });
                idx++;
            }
        }
    }

    // Notas Adm
    for (const aluno of admAlunos) {
        for (const materiaId of admMateriasIds) {
            for (let bimestre = 1; bimestre <= 4; bimestre++) {
                notasData.push({ alunoId: aluno.id, materiaId, bimestre, ano: 2025, mencao: mencoesPool[idx % mencoesPool.length] });
                idx++;
            }
        }
    }

    await prisma.nota.createMany({ data: notasData });
    console.log('Notas criadas:', notasData.length);

    // ── Extracurriculares ──
    await prisma.extracurricular.createMany({
        data: [
            { alunoId: alunos[0].id, instituicao: 'Alura', descricao: 'Formação completa em Vue.js: componentes, Vuex, Vue Router e testes', inicio: new Date('2024-03-01'), fim: new Date('2024-09-01') },
            { alunoId: alunos[0].id, instituicao: 'ETEC', descricao: 'Hackathon ETEC 2024 - 2º lugar - Projeto de app para acessibilidade', inicio: new Date('2024-10-15'), fim: new Date('2024-10-17') },
            { alunoId: alunos[1].id, instituicao: 'Rocketseat', descricao: 'NLW Expert - Trilha Node.js: APIs REST, Prisma ORM e testes automatizados', inicio: new Date('2024-06-01'), fim: new Date('2024-06-07') },
            { alunoId: alunos[2].id, instituicao: 'DIO', descricao: 'Bootcamp Git/GitHub: versionamento, branches, pull requests e CI/CD', inicio: new Date('2024-04-01'), fim: new Date('2024-05-15') },
            { alunoId: alunos[4].id, instituicao: 'Udemy', descricao: 'Curso completo de React Native: do zero ao deploy na Play Store', inicio: new Date('2024-01-10'), fim: new Date('2024-04-20') },
            { alunoId: alunos[5].id, instituicao: 'Cisco Networking Academy', descricao: 'CCNA - Módulo 1: Introdução a redes, modelo OSI/TCP-IP e endereçamento IPv4', inicio: new Date('2024-01-15'), fim: new Date('2024-07-15') },
            { alunoId: alunos[6].id, instituicao: 'CompTIA', descricao: 'CompTIA Network+ Study Group - Preparação para certificação', inicio: new Date('2024-03-01'), fim: new Date('2024-08-30') },
            { alunoId: alunos[7].id, instituicao: 'Google', descricao: 'Certificado Profissional em Gerenciamento de Projetos do Google', inicio: new Date('2024-02-01'), fim: new Date('2024-06-30') },
            { alunoId: alunos[8].id, instituicao: 'SEBRAE', descricao: 'Curso de Empreendedorismo e Inovação para Jovens', inicio: new Date('2024-05-01'), fim: new Date('2024-07-31') },
            { alunoId: alunos[9].id, instituicao: 'Google', descricao: 'Certificado UX Design do Google: pesquisa, wireframes, protótipos e testes', inicio: new Date('2024-08-01'), fim: new Date('2024-12-15') },
        ],
    });
    console.log('Extracurriculares criados: 10');

    // ── Boletins ──
    await prisma.boletim.createMany({
        data: [
            { alunoId: alunos[0].id, link: 'boletins/lucas-pereira-2025-1.pdf', caminho: 'boletins/lucas-pereira-2025-1.pdf', status: 'APROVADO' },
            { alunoId: alunos[1].id, link: 'boletins/beatriz-costa-2025-1.pdf', caminho: 'boletins/beatriz-costa-2025-1.pdf', status: 'APROVADO' },
            { alunoId: alunos[2].id, link: 'boletins/gabriel-almeida-2025-1.pdf', caminho: 'boletins/gabriel-almeida-2025-1.pdf', status: 'EM_ANALISE' },
            { alunoId: alunos[5].id, link: 'boletins/juliana-santos-2025-1.pdf', caminho: 'boletins/juliana-santos-2025-1.pdf', status: 'APROVADO' },
            { alunoId: alunos[7].id, link: 'boletins/larissa-martins-2025-1.pdf', caminho: 'boletins/larissa-martins-2025-1.pdf', status: 'RECUSADO' },
        ],
    });
    console.log('Boletins criados: 5');

    // ── Vínculos (professor-aluno) ──
    await prisma.vinculo.createMany({
        data: [
            { professorId: prof1.id, vinculoComAlunoId: alunos[0].id, accepted: true },
            { professorId: prof1.id, vinculoComAlunoId: alunos[1].id, accepted: true },
            { professorId: prof1.id, vinculoComAlunoId: alunos[2].id, accepted: true },
            { professorId: prof1.id, vinculoComAlunoId: alunos[9].id, accepted: true },
            { professorId: prof2.id, vinculoComAlunoId: alunos[3].id, accepted: true },
            { professorId: prof2.id, vinculoComAlunoId: alunos[4].id, accepted: true },
            { professorId: prof3.id, vinculoComAlunoId: alunos[5].id, accepted: true },
            { professorId: prof3.id, vinculoComAlunoId: alunos[6].id, accepted: false },
            { alunoId: alunos[0].id, vinculoComAlunoId: alunos[1].id, accepted: true },
            { alunoId: alunos[2].id, vinculoComAlunoId: alunos[9].id, accepted: false },
        ],
    });
    console.log('Vínculos criados: 10');

    // ── Mensagens ──
    await prisma.mensagem.create({
        data: { conteudo: 'Olá Lucas, parabéns pelo desempenho no Projeto Integrador! Continue assim.', professorRemetenteId: prof1.id, alunoDestinatarioId: alunos[0].id },
    });
    await prisma.mensagem.create({
        data: { conteudo: 'Obrigado professor Carlos! Estou me dedicando bastante ao Vue.js.', alunoRemetenteId: alunos[0].id, professorDestinatarioId: prof1.id },
    });
    await prisma.mensagem.create({
        data: { conteudo: 'Beatriz, temos uma vaga de estágio back-end que combina com seu perfil. Interesse?', empresaRemetenteId: emp2.id, alunoDestinatarioId: alunos[1].id },
    });
    await prisma.mensagem.create({
        data: { conteudo: 'Sim, tenho muito interesse! Como faço para me candidatar?', alunoRemetenteId: alunos[1].id, empresaDestinatarioId: emp2.id },
    });
    await prisma.mensagem.create({
        data: { conteudo: 'Juliana, você precisa entregar o relatório de configuração da rede até sexta-feira.', funcionarioRemetenteId: func3.id, alunoDestinatarioId: alunos[5].id },
    });
    console.log('Mensagens criadas: 5');

    console.log('\n✅ Seed completo!');
    console.log('Senha padrão de todos os usuários: 123456');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
