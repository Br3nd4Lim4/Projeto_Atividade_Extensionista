const SUPABASE_URL = "https://ncibjmjhkdxlemawyqqb.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_L7zon-w15Jm52vub0vnvxw_b240v-6f";

let bancoDados = null;
if (typeof supabase !== "undefined" && typeof supabase.createClient === "function") {
  bancoDados = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const METADADOS_CATEGORIA = {
  plastico: {
    rotulo: "Plástico",
    cor: "var(--cor-plastico)",
    imagem: "assets/plastico.jpg",
    textoAlternativo: "Ilustração sobre descarte de plástico",
    credito: { texto: "Fonte: Pixabay", url: "https://pixabay.com/pt/photos/pl%C3%A1stico-detritos-volumosos-4597957/" }
  },
  vidro: {
    rotulo: "Vidro",
    cor: "var(--cor-vidro)",
    imagem: "assets/vidro.jpg",
    textoAlternativo: "Ilustração sobre descarte de vidro",
    credito: { texto: "Fonte: Pixabay", url: "https://pixabay.com/pt/photos/copo-garrafas-vidro-reciclado-lixo-239348/" }
  },
  papel: {
    rotulo: "Papel",
    cor: "var(--cor-papel)",
    imagem: "assets/papel.jpg",
    textoAlternativo: "Ilustração sobre descarte de papel",
    credito: { texto: "Fonte: Pixabay", url: "https://pixabay.com/pt/photos/destruidor-esmagado-papel-flocos-779853/" }
  },
  metal: {
    rotulo: "Metal",
    cor: "var(--cor-metal)",
    imagem: "assets/metal.jpg",
    textoAlternativo: "Ilustração sobre descarte de metal",
    credito: { texto: "Fonte: Pixabay", url: "https://pixabay.com/pt/photos/lixeiras-ind%C3%BAstria-reciclando-velho-3119669/" }
  },
  organico: {
    rotulo: "Orgânico",
    cor: "var(--cor-organico)",
    imagem: "assets/organico.jpg",
    textoAlternativo: "Ilustração sobre resíduos orgânicos",
    credito: { texto: "Fonte: Pixabay", url: "https://pixabay.com/pt/photos/composto-ecologia-res%C3%ADduos-jardim-6053136/" }
  },
  rejeito: {
    rotulo: "Rejeito",
    cor: "var(--cor-rejeito)",
    imagem: "assets/rejeito.jpg",
    textoAlternativo: "Ilustração sobre rejeito",
    credito: { texto: "Fonte: Pixabay", url: "https://pixabay.com/pt/photos/aterro-sanit%C3%A1rio-aterro-lix%C3%A3o-lixo-6988228/" }
  },
  geral: {
    rotulo: "Sustentabilidade",
    cor: "var(--cor-geral)",
    imagem: "assets/geral.jpg",
    textoAlternativo: "Ilustração sobre sustentabilidade",
    credito: { texto: "Fonte: Pixabay", url: "https://pixabay.com/pt/photos/solo-plantas-crescer-agricultura-8080788/" }
  },
};

const BANCO_DE_PERGUNTAS = [

  {
    categoria: "plastico",
    enunciado: "Qual destes itens deve ser descartado na lixeira de PLÁSTICO?",
    opcoes: ["Corpo e tampa de canetas de escrever", "Pacote de salgadinho", "Fita adesiva", "Nenhuma das opções"],
    indiceCorreto: 0,
    explicacao: "Canetas sem refil, tampas e sacolas vão para o plástico. Pacotes de salgadinho e fita adesiva devem ser descartados no rejeito."
  },
  {
    categoria: "plastico",
    enunciado: "Qual destes itens plásticos deve ir para o REJEITO, e não para a reciclagem?",
    opcoes: ["Pote de manteiga vazio", "Talher plástico descartável usado em uma festa", "Garrafa de refrigerante vazia", "Sacola de compras do mercado"],
    indiceCorreto: 1,
    explicacao: "Talheres descartáveis e mexedores de café de acrílico são plásticos de uso único e vão para o rejeito, mesmo sendo feitos de plástico. Potes, garrafas e sacolas plásticas comuns são aceitos na reciclagem."
  },
  {
    categoria: "plastico",
    enunciado: "Qual é o símbolo universalmente usado para indicar que uma embalagem é reciclável?",
    opcoes: ["Uma seta contínua em linha reta", "Um quadrado verde sólido", "Três setas formando um triângulo", "Uma folha estilizada"],
    indiceCorreto: 2,
    explicacao: "O símbolo de reciclagem é conhecido como \"fita de Möbius\": três setas que se conectam formando um triângulo, indicando o ciclo de reciclagem."
  },
  {
    categoria: "plastico",
    enunciado: "Aproximadamente quanto tempo uma garrafa PET pode levar para se decompor na natureza?",
    opcoes: ["Poucos meses", "Cerca de 1 ano", "Algumas semanas", "Centenas de anos"],
    indiceCorreto: 3,
    explicacao: "Estima-se que uma garrafa PET pode levar centenas de anos para se decompor totalmente na natureza, reforçando a importância de reciclá-la."
  },
  {
    categoria: "plastico",
    enunciado: "Qual destes itens, apesar de ser feito de plástico, deve ser descartado no REJEITO?",
    opcoes: ["Embalagem de biscoito recheado", "Garrafa de suco", "Pote de manteiga", "Sacola de compras"],
    indiceCorreto: 0,
    explicacao: "Embalagens metalizadas, como as de biscoitos recheados, salgadinhos e tampas de iogurte, não seguem o processo comum de reciclagem de plástico e vão para o rejeito — mesmo parecendo uma embalagem plástica comum."
  },
  {
    categoria: "vidro",
    enunciado: "Qual item é aceito na lixeira de VIDRO?",
    opcoes: ["Espelho quebrado", "Frasco de esmalte limpo", "Lâmpada queimada", "Prato de porcelana limpo"],
    indiceCorreto: 1,
    explicacao: "Frascos, garrafas e copos de vidro são recicláveis. Espelhos, lâmpadas e porcelana têm composição diferente e não entram na reciclagem comum de vidro."
  },
  {
    categoria: "vidro",
    enunciado: "Óculos e vidros temperados devem ser descartados como:",
    opcoes: ["Vidro", "Papel", "Rejeito", "Metal"],
    indiceCorreto: 2,
    explicacao: "Vidros temperados, óculos e ampolas de medicamento não seguem o processo comum de reciclagem de vidro e vão para o rejeito."
  },
  {
    categoria: "vidro",
    enunciado: "Segundo a cartilha, como devem ser descartadas as LÂMPADAS queimadas?",
    opcoes: ["Junto com o vidro reciclável comum", "No rejeito, como os demais vidros não recicláveis", "Junto com pilhas na lixeira de metal", "Em um local específico de destinação, indicado na cartilha"],
    indiceCorreto: 3,
    explicacao: "Diferente de outros vidros não recicláveis que vão direto para o rejeito, as lâmpadas têm uma legenda própria na cartilha, indicando um local específico de destinação, com link disponível no documento."
  },
  {
    categoria: "vidro",
    enunciado: "Uma ampola de vidro de medicamento vazia deve ser descartada como:",
    opcoes: ["Rejeito", "Vidro reciclável", "Papel", "Metal"],
    indiceCorreto: 0,
    explicacao: "Ampolas de medicamento, assim como óculos e vidros temperados, não seguem o processo comum de reciclagem de vidro e devem ser descartadas no rejeito."
  },
  {
    categoria: "vidro",
    enunciado: "Segundo a cartilha, além da coleta interna da empresa, onde é possível encontrar pontos adicionais de descarte de VIDRO em Florianópolis?",
    opcoes: ["Somente em supermercados", "Em uma lista completa de PEVs por bairro, indicada na cartilha", "A cartilha não indica outras opções", "Apenas presencialmente na prefeitura"],
    indiceCorreto: 1,
    explicacao: "A cartilha traz um link com a lista completa dos bairros que possuem Pontos de Entrega Voluntária (PEV) para descarte de vidro."
  },
  {
    categoria: "papel",
    enunciado: "Qual destes itens pode ser reciclado como PAPEL?",
    opcoes: ["Papel higiênico usado", "Fita adesiva", "Revistas", "Papel toalha do banheiro"],
    indiceCorreto: 2,
    explicacao: "Jornais, revistas/panfletos feitos com papel couchê, cadernos e caixas de papelão são recicláveis. Papel higiênico, papel toalha de banheiro e fitas adesivas vão para o rejeito."
  },
  {
    categoria: "papel",
    enunciado: "Fotos e papéis engordurados (como embalagem de salgados) devem ir para:",
    opcoes: ["Lixeira de papel", "Lixeira de orgânico", "Lixeira de plástico", "Rejeito"],
    indiceCorreto: 3,
    explicacao: "Papéis engordurados e fotos perdem a capacidade de reciclagem e devem ser descartados no rejeito."
  },
  {
    categoria: "papel",
    enunciado: "Além de jornais e revistas, qual destes itens também é aceito na reciclagem de PAPEL?",
    opcoes: ["Papel de presente e cartolinas", "Papel carbono", "Etiquetas adesivas", "Guardanapo usado na copa"],
    indiceCorreto: 0,
    explicacao: "O guia básico de reciclagem da cartilha inclui papel de presente, papel seda, panfletos e cartolinas como materiais aceitos na reciclagem de papel. Papel carbono e etiquetas vão para o rejeito, e o guardanapo usado na copa vai para o orgânico."
  },
  {
    categoria: "papel",
    enunciado: "Etiquetas, papel carbono e fita adesiva devem ser descartados como:",
    opcoes: ["Papel", "Rejeito", "Metal", "Vidro"],
    indiceCorreto: 1,
    explicacao: "Adesivos, etiquetas, papel carbono e fita adesiva não são recicláveis e vão para o rejeito."
  },
  {
    categoria: "papel",
    enunciado: "Uma embalagem tetra pak, como caixinha de suco, deve ser descartada como:",
    opcoes: ["Plástico", "Metal", "Papel/papelão", "Rejeito"],
    indiceCorreto: 2,
    explicacao: "Apesar de ter camadas de plástico e alumínio, a embalagem tetra pak é descartada junto com papel/papelão."
  },
  {
    categoria: "metal",
    enunciado: "Qual item deve ir na lixeira de METAL?",
    opcoes: ["Pilha usada", "Clipes de papel", "Esponja de aço", "Lata de aerosol"],
    indiceCorreto: 3,
    explicacao: "Latas de alimento, ferragens, canos e latas de aerosol são metais recicláveis. Clipes, grampos, esponjas de aço e pilhas ficam de fora dessa coleta."
  },
  {
    categoria: "metal",
    enunciado: "Pilhas e baterias usadas devem ser descartadas:",
    opcoes: ["Em pontos de coleta específicos (PEV)", "Na lixeira de metal", "Na lixeira de rejeito", "Nenhuma das opções"],
    indiceCorreto: 0,
    explicacao: "Pilhas e baterias são resíduos que exigem destinação especial e devem ir a pontos de entrega voluntária apropriados."
  },
  {
    categoria: "metal",
    enunciado: "Clipes de papel, grampos e esponjas de aço devem ser descartados como:",
    opcoes: ["Metal", "Rejeito", "Papel", "Orgânico"],
    indiceCorreto: 1,
    explicacao: "Mesmo sendo metálicos, clipes, grampos e esponjas de aço não são aceitos na coleta de metal da empresa e devem ir para o rejeito."
  },
  {
    categoria: "metal",
    enunciado: "Depois de retirar o lacre de uma lata de refrigerante vazia, qual é o destino correto de cada parte?",
    opcoes: ["A lata vai para o rejeito; o lacre vai para metal", "Ambos vão para a mesma lixeira de metal", "A lata vai para metal; o lacre vai para o local específico de tampinhas e lacres", "A lata vai para metal; o lacre vai para rejeito"],
    indiceCorreto: 2,
    explicacao: "Latas de refrigerante e energético vão para o metal; já o lacre deve ser retirado e destinado ao local específico de tampinhas e lacres, e não descartado junto com a lata."
  },
  {
    categoria: "metal",
    enunciado: "Ferragens, canos, arames e pregos, quando descartados, vão para qual categoria de reciclagem?",
    opcoes: ["Rejeito", "Outros materiais", "Plástico", "Metal"],
    indiceCorreto: 3,
    explicacao: "Ferragens, canos, arames, pregos, latas de tinta e de aerosol são metais recicláveis, segundo o guia básico de reciclagem da cartilha."
  },
  {
    categoria: "organico",
    enunciado: "Qual conjunto de itens é aceito no descarte de ORGÂNICO?",
    opcoes: ["Cascas de fruta e casca de ovo, guardanapo sujo de comida e talher ou palito de madeira", "Apenas cascas de fruta e casca de ovo", "Apenas guardanapo sujo de comida", "Apenas talher ou palito de madeira"],
    indiceCorreto: 0,
    explicacao: "Cascas de frutas e ovos, guardanapos (mesmo sujos de comida ou detergente) e talheres ou palitos de madeira são todos aceitos no orgânico — não só um desses itens isoladamente."
  },
  {
    categoria: "organico",
    enunciado: "Entre os itens abaixo, qual NÃO deve ser descartado no balde de resíduos orgânicos, mesmo sendo biodegradável?",
    opcoes: ["Guardanapo sujo de comida", "Papel toalha do banheiro", "Casca de ovo", "Erva-mate usada"],
    indiceCorreto: 1,
    explicacao: "Papel toalha do banheiro vai para o rejeito, mesmo sendo biodegradável. Já o guardanapo e o papel toalha usados na copa (limpos ou sujos de comida ou detergente) são aceitos no orgânico. A diferença está em onde o papel foi utilizado."
  },
  {
    categoria: "organico",
    enunciado: "Na compostagem da empresa, qual item NÃO pode ser colocado no balde de orgânico?",
    opcoes: ["Cascas de frutas", "Grãos e sementes", "Óleo de cozinha", "Ossos"],
    indiceCorreto: 2,
    explicacao: "Óleo e gordura prejudicam o processo de compostagem e não devem ser despejados no balde orgânico."
  },
  {
    categoria: "organico",
    enunciado: "Na compostagem doméstica, qual destes itens NÃO deve ser usado, mesmo sendo de origem vegetal?",
    opcoes: ["Cascas de banana", "Borra de café", "Grãos e sementes", "Alho e cebola"],
    indiceCorreto: 3,
    explicacao: "Temperos fortes, como pimenta, alho e cebola, não podem ser usados na compostagem doméstica, ao contrário de cascas de frutas, borra de café e grãos e sementes, que podem ser usados à vontade."
  },
  {
    categoria: "organico",
    enunciado: "Segundo a cartilha, serragem grossa, palhas, folhas, gramas e podas de jardim trituradas devem ser:",
    opcoes: ["Misturadas ao processo de compostagem", "Descartadas no rejeito", "Descartadas diretamente na natureza", "Queimadas"],
    indiceCorreto: 0,
    explicacao: "A cartilha orienta que esses materiais devem ser misturados ao processo de compostagem, tanto na empresa quanto em casa."
  },
  {
    categoria: "organico",
    enunciado: "Como é garantida a destinação correta dos resíduos orgânicos coletados na empresa?",
    opcoes: ["Colaboradores específicos da própria empresa ficam encarregados da destinação correta", "Por meio de uma empresa especializada contratada", "São descartados junto com o rejeito comum", "Não há destinação específica para esse material"],
    indiceCorreto: 1,
    explicacao: "O material orgânico é recolhido por uma empresa especializada contratada, que garante a destinação correta dos resíduos."
  },
  {
    categoria: "organico",
    enunciado: "Um palito de picolé limpo deve ir para:",
    opcoes: ["Plástico", "Rejeito", "Orgânico", "Madeira (outros materiais)"],
    indiceCorreto: 2,
    explicacao: "Palitos de picolé limpos e mexedores de bambu são descartados no orgânico."
  },
  {
    categoria: "organico",
    enunciado: "Na compostagem da empresa, sob qual condição os embutidos (como presunto e salame) podem ser descartados no orgânico?",
    opcoes: ["Estejam cortados em pedaços pequenos", "Estejam vencidos há mais de 3 dias", "Nunca podem ser descartados no orgânico", "Estejam sem a embalagem plástica"],
    indiceCorreto: 3,
    explicacao: "Embutidos são aceitos na compostagem da empresa, desde que estejam sem a embalagem plástica. Não há exigência de corte em pedaços ou prazo de validade."
  },
  {
    categoria: "organico",
    enunciado: "Qual destes itens PODE ser usado à vontade (sem necessidade de moderação) na compostagem doméstica?",
    opcoes: ["Grãos e sementes", "Laticínios", "Alimentos cozidos", "Frutas cítricas"],
    indiceCorreto: 0,
    explicacao: "Grãos e sementes podem ser usados à vontade na compostagem doméstica. Já laticínios, alimentos cozidos e frutas cítricas devem ser usados apenas com moderação, segundo a cartilha."
  },
  {
    categoria: "rejeito",
    enunciado: "Qual destes itens de higiene pessoal, mesmo sendo descartável, NÃO pode ser reciclado e deve ir para o REJEITO?",
    opcoes: ["Escova de dente usada", "Absorvente higiênico", "Guardanapo de papel", "Frasco de shampoo vazio"],
    indiceCorreto: 1,
    explicacao: "Absorventes, cotonetes, fio dental e chiclete não são recicláveis e devem ser descartados no rejeito. Já escovas de dente e frascos plásticos (potes) são aceitos na reciclagem de plástico, e o guardanapo vai para o orgânico."
  },
  {
    categoria: "rejeito",
    enunciado: "Um pacote de salgadinhos ou uma embalagem de café devem ser descartados como:",
    opcoes: ["Plástico", "Papel", "Rejeito", "Metal"],
    indiceCorreto: 2,
    explicacao: "Embalagens metalizadas de salgadinhos, biscoitos e café não são recicláveis e vão para o rejeito."
  },
  {
    categoria: "rejeito",
    enunciado: "Qual das afirmações abaixo melhor caracteriza o que é REJEITO?",
    opcoes: ["É todo material orgânico que não foi separado corretamente", "É qualquer resíduo reciclável descartado na lixeira errada", "É o nome dado aos materiais recicláveis de baixo valor comercial", "É o material sem possibilidade de reciclagem no momento, sendo destinado ao aterro sanitário"],
    indiceCorreto: 3,
    explicacao: "O rejeito é o material sem possibilidade de reciclagem no momento, destinado ao aterro sanitário, diferente de material orgânico mal separado ou de reciclável jogado na lixeira errada, que ainda podem ser reaproveitados se corrigidos."
  },
  {
    categoria: "rejeito",
    enunciado: "Cotonetes e esponjas de banho usadas devem ser descartados como:",
    opcoes: ["Rejeito", "Orgânico", "Plástico", "Papel"],
    indiceCorreto: 0,
    explicacao: "Cotonetes, esponjas, fio dental e absorventes não são recicláveis e vão para o rejeito."
  },
  {
    categoria: "geral",
    enunciado: "Dos \"5 R's\" da sustentabilidade, qual representa refletir sobre hábitos de consumo antes de comprar?",
    opcoes: ["Reciclar", "Repensar", "Reutilizar", "Recusar"],
    indiceCorreto: 1,
    explicacao: "Repensar é avaliar hábitos, escolhas e a procedência dos produtos antes mesmo de consumir."
  },
  {
    categoria: "geral",
    enunciado: "Evitar aceitar sacolas plásticas e itens descartáveis desnecessários é um exemplo de qual R?",
    opcoes: ["Reduzir", "Reutilizar", "Recusar", "Reciclar"],
    indiceCorreto: 2,
    explicacao: "Recusar é não aceitar objetos desnecessários no momento, como sacolas plásticas extras e descartáveis."
  },
  {
    categoria: "geral",
    enunciado: "Dar um novo uso a um produto que não serve mais para sua função original é um exemplo de qual R?",
    opcoes: ["Reciclar", "Repensar", "Recusar", "Reutilizar"],
    indiceCorreto: 3,
    explicacao: "Reutilizar é dar uma nova forma ou utilidade a produtos que não usamos mais, evitando descartar algo que ainda tem ciclo de vida útil."
  },
  {
    categoria: "geral",
    enunciado: "Evitar compras por impulso, comprando apenas o que é realmente necessário, é um exemplo de qual R?",
    opcoes: ["Reduzir", "Reciclar", "Recusar", "Repensar"],
    indiceCorreto: 0,
    explicacao: "Reduzir é diminuir o desperdício e a produção de resíduos, evitando compras e aquisições que não vêm de uma necessidade real."
  },
  {
    categoria: "geral",
    enunciado: "Além de orgânicos, volumosos e eletroeletrônicos, sobre qual outro tipo de resíduo o site da Prefeitura de Florianópolis também traz informações de descarte, segundo a cartilha?",
    opcoes: ["Roupas usadas", "Dejetos de cães e gatos", "Tampinhas e lacres", "Isopor"],
    indiceCorreto: 1,
    explicacao: "O site da prefeitura traz informações sobre diversos resíduos, incluindo orgânicos, volumosos, eletroeletrônicos, óleo de cozinha, dejetos de cães e gatos, lâmpadas, pilhas e baterias, entre outros. Roupas, tampinhas/lacres e isopor têm pontos de descarte próprios indicados em outras partes da cartilha."
  },
  {
    categoria: "geral",
    enunciado: "Segundo a cartilha, roupas podem ser destinadas a Pontos de Entrega Voluntária (PEV) em qual rede de lojas, através do movimento ReCiclo?",
    opcoes: ["O Boticário", "Renner", "C&A", "Riachuelo"],
    indiceCorreto: 2,
    explicacao: "As lojas C&A participam do movimento ReCiclo, funcionando como PEV para o descarte de roupas."
  },
  {
    categoria: "geral",
    enunciado: "Materiais como madeira e resíduos de serviços de saúde são classificados na cartilha como:",
    opcoes: ["Recicláveis comuns, junto com o papel", "Sempre aceitos no orgânico", "Sempre aceitos no rejeito comum", "Outros materiais, com descarte específico"],
    indiceCorreto: 3,
    explicacao: "A cartilha lista madeira, resíduos radioativos, ambulatoriais/de serviços de saúde e perigosos como categorias à parte, com descarte específico."
  },
  {
    categoria: "geral",
    enunciado: "No prédio de Florianópolis, onde fica localizado o descarte de resíduos orgânicos no térreo?",
    opcoes: ["Na copa do térreo", "Na recepção", "No estacionamento", "O andar térreo não possui ponto para descarte de resíduos orgânicos"],
    indiceCorreto: 0,
    explicacao: "O descarte do orgânico no térreo do prédio de Florianópolis se encontra na copa."
  },
  {
    categoria: "geral",
    enunciado: "Do 1º ao 6º andar do prédio de Florianópolis, onde ficam localizados os contentores de coleta seletiva?",
    opcoes: ["Dentro de cada sala", "Nos corredores entre as copas e o banheiro", "Somente no térreo", "Nas copas"],
    indiceCorreto: 1,
    explicacao: "Os contentores da coleta seletiva ficam nos corredores entre as copas e o banheiro de todos os andares."
  },
  {
    categoria: "geral",
    enunciado: "Além do lixo eletrônico e das tampinhas/lacres, a empresa também é Ponto de Entrega Voluntária (PEV) de qual item?",
    opcoes: ["Óleo de cozinha", "Pneus", "Esponjas domésticas", "Baterias automotivas"],
    indiceCorreto: 2,
    explicacao: "Na empresa temos ponto de entrega voluntária de lixo eletrônico, rolinhos de papel higiênico/toalha, esponjas domésticas, lacres e tampinhas."
  },
  {
    categoria: "geral",
    enunciado: "Quem monitora o andamento da coleta seletiva em cada andar da empresa?",
    opcoes: ["Somente o setor de ADM", "Apenas a recepção", "Somente empresas terceirizadas externas", "Os Guardiões Ambientais"],
    indiceCorreto: 3,
    explicacao: "Os Guardiões Ambientais monitoram a coleta seletiva em seus respectivos andares, atuando junto com a equipe do Instituto da empresa."
  },
  {
    categoria: "geral",
    enunciado: "Antes de uma confraternização que vá gerar bastante resíduo orgânico, qual é a orientação da cartilha?",
    opcoes: ["Solicitar um balde de orgânico com antecedência ao Instituto da empresa ou ao Guardião Ambiental", "Descartar tudo direto no rejeito", "Levar os resíduos para casa", "Não é necessário nenhum cuidado especial"],
    indiceCorreto: 0,
    explicacao: "Em caso de confraternizações, deve-se solicitar um balde de orgânico com antecedência à equipe do Instituto da empresa ou ao Guardião Ambiental do andar."
  },
  {
    categoria: "geral",
    enunciado: "Tampinhas e lacres coletados nos escritórios são destinados a qual finalidade final?",
    opcoes: ["Fabricação de brinquedos", "Castração de animais em vulnerabilidade", "Produção de artesanato", "Geração de energia"],
    indiceCorreto: 1,
    explicacao: "As tampinhas e lacres coletados são revertidos, por meio de parceria, em recursos para castração de animais em situação de vulnerabilidade."
  },
  {
    categoria: "geral",
    enunciado: "Rolinhos de papel higiênico e toalha coletados nos banheiros viram artigos de papelaria através de qual parceria?",
    opcoes: ["ECOPET", "WEEE.DO", "COEPAD", "Nenhuma das opções"],
    indiceCorreto: 2,
    explicacao: "Esses rolinhos são destinados a uma parceria que os transforma em artigos de papelaria, com participação de pessoas com deficiência."
  },
  {
    categoria: "geral",
    enunciado: "Onde deve ser descartado o lixo eletrônico, como celulares antigos e cabos?",
    opcoes: ["No lixo comum", "Na lixeira de metal", "No rejeito", "No ponto de entrega voluntária (PEV) de eletroeletrônicos"],
    indiceCorreto: 3,
    explicacao: "Eletroeletrônicos têm ponto de entrega voluntária próprio, com destinação especializada para reciclagem."
  },
  {
    categoria: "geral",
    enunciado: "Qual das atitudes abaixo é indicada pela cartilha para economizar água na empresa?",
    opcoes: ["Apertar a descarga pelo menor tempo possível, usando o botão menor", "Deixar a torneira pingando levemente para não gastar água ao religar", "Lavar a louça enxaguando cada peça separadamente, aos poucos", "Tomar banhos de banheira em vez de chuveiro"],
    indiceCorreto: 0,
    explicacao: "A cartilha orienta apertar a descarga pelo menor tempo possível — o botão menor libera menos fluxo de água. Deixar a torneira pingando, lavar louça peça por peça com torneira aberta ou tomar banhos de banheira desperdiçam água, mesmo parecendo cuidados razoáveis."
  },
  {
    categoria: "geral",
    enunciado: "Qual é a temperatura recomendada para o ar-condicionado, equilibrando conforto térmico e economia de energia?",
    opcoes: ["18°C", "23°C", "26°C", "16°C"],
    indiceCorreto: 1,
    explicacao: "23°C é indicada como a temperatura ideal para conforto térmico e, ao mesmo tempo, para reduzir o consumo de energia."
  }
];

const PERGUNTAS_POR_RODADA = 10;

let perguntasDaRodada = [];
let indiceAtual = 0;

const telaInicio = document.getElementById("screen-start");
const telaQuiz = document.getElementById("screen-quiz");
const telaResultado = document.getElementById("screen-result");

const botaoComecar = document.getElementById("btn-start");
const botaoAnterior = document.getElementById("btn-prev");
const botaoProximo = document.getElementById("btn-next");
const botaoEncerrar = document.getElementById("btn-finish");
const botaoReiniciar = document.getElementById("btn-restart");

const inputNome = document.getElementById("input-nome");
const inputSobrenome = document.getElementById("input-sobrenome");
const erroJogador = document.getElementById("player-error");

const emblemaCategoria = document.getElementById("category-badge");
const rotuloCategoria = document.getElementById("category-label");
const pontuacaoAoVivo = document.getElementById("live-score");
const trilhaProgresso = document.getElementById("progress-track");
const indicePerguntaEl = document.getElementById("q-index");
const totalPerguntasEl = document.getElementById("q-total");
const midiaPergunta = document.getElementById("question-media");
const imagemPergunta = document.getElementById("question-image");
const creditoImagem = document.getElementById("question-image-credit");
const textoPergunta = document.getElementById("question-text");
const listaOpcoes = document.getElementById("options-list");
const caixaFeedback = document.getElementById("feedback-box");
const veredictoFeedback = document.getElementById("feedback-verdict");
const explicacaoFeedback = document.getElementById("feedback-explanation");

const pontuacaoFinal = document.getElementById("final-score");
const statAcertos = document.getElementById("stat-correct");
const statErros = document.getElementById("stat-wrong");
const statNaoRespondidasBox = document.getElementById("stat-unanswered-box");
const statNaoRespondidas = document.getElementById("stat-unanswered");
const tituloResultado = document.getElementById("result-title");
const textoResultado = document.getElementById("result-copy");
const listaRevisao = document.getElementById("review-list");

let jogador = { nome: "", sobrenome: "" };

totalPerguntasEl.textContent = PERGUNTAS_POR_RODADA;

function embaralhar(lista) {
  const copia = lista.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function mostrarTela(tela) {
  [telaInicio, telaQuiz, telaResultado].forEach(cadaTela => cadaTela.classList.add("hidden"));
  tela.classList.remove("hidden");
}

function iniciarRodada() {
  perguntasDaRodada = embaralhar(BANCO_DE_PERGUNTAS).slice(0, PERGUNTAS_POR_RODADA).map(pergunta => {
    const ordemOpcoes = embaralhar(pergunta.opcoes.map((texto, i) => ({ texto, correta: i === pergunta.indiceCorreto })));
    return { ...pergunta, opcoesEmbaralhadas: ordemOpcoes, respostaUsuario: null };
  });
  indiceAtual = 0;
  criarPontosProgresso();
  mostrarTela(telaQuiz);
  renderizarPergunta();
}

function criarPontosProgresso() {
  trilhaProgresso.innerHTML = "";
  for (let i = 0; i < PERGUNTAS_POR_RODADA; i++) {
    const ponto = document.createElement("button");
    ponto.type = "button";
    ponto.className = "dot";
    ponto.setAttribute("aria-label", `Ir para a pergunta ${i + 1}`);
    ponto.addEventListener("click", () => {
      indiceAtual = i;
      renderizarPergunta();
    });
    trilhaProgresso.appendChild(ponto);
  }
}

function atualizarPontosProgresso() {
  const pontos = trilhaProgresso.querySelectorAll(".dot");
  pontos.forEach((ponto, i) => {
    const pergunta = perguntasDaRodada[i];
    ponto.classList.toggle("done", !!pergunta.respostaUsuario);
    ponto.classList.toggle("current", i === indiceAtual);
  });
}

function pontuacaoAtual() {
  return perguntasDaRodada.filter(pergunta => pergunta.respostaUsuario && pergunta.respostaUsuario.correta).length;
}

function renderizarPergunta() {
  const pergunta = perguntasDaRodada[indiceAtual];

  const metadados = METADADOS_CATEGORIA[pergunta.categoria];
  emblemaCategoria.style.setProperty("--c", metadados.cor);
  rotuloCategoria.textContent = metadados.rotulo;

  pontuacaoAoVivo.textContent = pontuacaoAtual();
  indicePerguntaEl.textContent = indiceAtual + 1;
  atualizarPontosProgresso();

  if (metadados.imagem) {
    imagemPergunta.src = metadados.imagem;
    imagemPergunta.alt = metadados.textoAlternativo || "";
    midiaPergunta.classList.remove("hidden");

    if (metadados.credito) {
      creditoImagem.href = metadados.credito.url;
      creditoImagem.textContent = metadados.credito.texto;
      creditoImagem.classList.remove("hidden");
    } else {
      creditoImagem.classList.add("hidden");
    }
  } else {
    imagemPergunta.src = "";
    midiaPergunta.classList.add("hidden");
  }

  textoPergunta.textContent = pergunta.enunciado;

  listaOpcoes.innerHTML = "";
  const letras = ["A", "B", "C", "D"];
  const jaRespondida = pergunta.respostaUsuario !== null;

  pergunta.opcoesEmbaralhadas.forEach((opcao, i) => {
    const botao = document.createElement("button");
    botao.className = "option-btn";
    botao.type = "button";
    botao.innerHTML = `<span class="option-letter">${letras[i]}</span><span>${opcao.texto}</span>`;

    if (jaRespondida) {
      botao.disabled = true;
      if (opcao.correta) {
        botao.classList.add("correct");
      } else if (i === pergunta.respostaUsuario.indiceEscolhido) {
        botao.classList.add("wrong");
      } else {
        botao.classList.add("dim");
      }
    } else {
      botao.addEventListener("click", () => selecionarResposta(i));
    }

    listaOpcoes.appendChild(botao);
  });

  if (jaRespondida) {
    mostrarFeedback(pergunta);
  } else {
    caixaFeedback.classList.add("hidden");
    caixaFeedback.classList.remove("is-correct", "is-wrong");
  }

  botaoAnterior.disabled = indiceAtual === 0;
  const ultimaPergunta = indiceAtual === PERGUNTAS_POR_RODADA - 1;
  botaoProximo.textContent = ultimaPergunta ? "Finalizar quiz" : "Próxima pergunta";
  botaoProximo.disabled = false;
}

function mostrarFeedback(pergunta) {
  const correta = pergunta.respostaUsuario.correta;
  caixaFeedback.classList.remove("hidden");
  caixaFeedback.classList.remove("is-correct", "is-wrong");
  caixaFeedback.classList.add(correta ? "is-correct" : "is-wrong");
  veredictoFeedback.textContent = correta ? "Correto!" : "Não foi dessa vez.";
  explicacaoFeedback.textContent = correta
    ? pergunta.explicacao
    : `Resposta correta: "${pergunta.opcoes[pergunta.indiceCorreto]}". ${pergunta.explicacao}`;
}

function selecionarResposta(indiceEscolhido) {
  const pergunta = perguntasDaRodada[indiceAtual];
  if (pergunta.respostaUsuario) return;

  const opcaoEscolhida = pergunta.opcoesEmbaralhadas[indiceEscolhido];
  pergunta.respostaUsuario = { indiceEscolhido, correta: opcaoEscolhida.correta };

  renderizarPergunta();
}

botaoComecar.addEventListener("click", () => {
  const nome = inputNome.value.trim();
  const sobrenome = inputSobrenome.value.trim();

  const nomeValido = nome.length >= 2;
  const sobrenomeValido = sobrenome.length >= 2;

  inputNome.classList.toggle("invalid", !nomeValido);
  inputSobrenome.classList.toggle("invalid", !sobrenomeValido);

  if (!nomeValido || !sobrenomeValido) {
    erroJogador.classList.remove("hidden");
    return;
  }

  erroJogador.classList.add("hidden");
  jogador = { nome, sobrenome };
  iniciarRodada();
});

botaoAnterior.addEventListener("click", () => {
  if (indiceAtual > 0) {
    indiceAtual--;
    renderizarPergunta();
  }
});

botaoProximo.addEventListener("click", () => {
  if (indiceAtual < PERGUNTAS_POR_RODADA - 1) {
    indiceAtual++;
    renderizarPergunta();
  } else {
    solicitarEncerramento();
  }
});

botaoEncerrar.addEventListener("click", solicitarEncerramento);

function solicitarEncerramento() {
  const quantidadeRespondidas = perguntasDaRodada.filter(pergunta => pergunta.respostaUsuario).length;
  const continuar = quantidadeRespondidas === PERGUNTAS_POR_RODADA
    ? true
    : confirm(`Você respondeu ${quantidadeRespondidas} de ${PERGUNTAS_POR_RODADA} perguntas. Deseja encerrar o quiz agora mesmo assim?`);
  if (continuar) encerrarRodada();
}

botaoReiniciar.addEventListener("click", iniciarRodada);

async function salvarResultado(acertos, totalRespondidas) {
  if (totalRespondidas === 0) return;

  if (!bancoDados) return;

  await bancoDados.from("quiz_resultados").insert([{
    nome: jogador.nome,
    sobrenome: jogador.sobrenome,
    acertos,
    total_perguntas: totalRespondidas
  }]);
}

function encerrarRodada() {
  const quantidadeCorretas = perguntasDaRodada.filter(pergunta => pergunta.respostaUsuario && pergunta.respostaUsuario.correta).length;
  const quantidadeErradas = perguntasDaRodada.filter(pergunta => pergunta.respostaUsuario && !pergunta.respostaUsuario.correta).length;
  const quantidadeNaoRespondidas = perguntasDaRodada.filter(pergunta => !pergunta.respostaUsuario).length;
  const quantidadeRespondidas = quantidadeCorretas + quantidadeErradas;

  pontuacaoFinal.textContent = quantidadeCorretas;
  document.querySelector(".score-of").textContent = `/${PERGUNTAS_POR_RODADA}`;
  statAcertos.textContent = quantidadeCorretas;
  statErros.textContent = quantidadeErradas;

  if (quantidadeNaoRespondidas > 0) {
    statNaoRespondidas.textContent = quantidadeNaoRespondidas;
    statNaoRespondidasBox.classList.remove("hidden");
  } else {
    statNaoRespondidasBox.classList.add("hidden");
  }

  if (quantidadeRespondidas === 0) {
    tituloResultado.textContent = `Quiz encerrado.`;
    textoResultado.textContent = "Nenhuma pergunta foi respondida nesta rodada. Confira o gabarito abaixo ou tente novamente.";
  } else if (quantidadeCorretas === PERGUNTAS_POR_RODADA) {
    tituloResultado.textContent = `Nota máxima!`;
    textoResultado.textContent = "Parabéns! Você domina as regras de descarte da cartilha.";
  } else if (quantidadeCorretas >= quantidadeRespondidas * 0.7 && quantidadeNaoRespondidas === 0) {
    tituloResultado.textContent = `Muito bem!`;
    textoResultado.textContent = "Você sabe separar a maior parte dos resíduos corretamente. Confira o gabarito abaixo para revisar o que errou.";
  } else if (quantidadeNaoRespondidas > 0) {
    tituloResultado.textContent = "Quiz encerrado antes do fim.";
    textoResultado.textContent = `Você respondeu ${quantidadeRespondidas} de ${PERGUNTAS_POR_RODADA} perguntas. Confira o gabarito completo abaixo.`;
  } else {
    tituloResultado.textContent = `Vamos revisar.`;
    textoResultado.textContent = "Vale a pena reler a cartilha de coleta seletiva. Confira o gabarito abaixo com as respostas certas de cada pergunta.";
  }

  renderizarRevisao();
  mostrarTela(telaResultado);
  salvarResultado(quantidadeCorretas, quantidadeRespondidas);
}

function renderizarRevisao() {
  listaRevisao.innerHTML = "";
  perguntasDaRodada.forEach((pergunta, indice) => {
    const elemento = document.createElement("div");
    const naoRespondida = !pergunta.respostaUsuario;
    const correta = pergunta.respostaUsuario && pergunta.respostaUsuario.correta;

    elemento.className = "review-item" + (naoRespondida ? " is-unanswered" : correta ? "" : " is-wrong");

    let linhaResposta;
    if (naoRespondida) {
      linhaResposta = `<p class="review-answer">Não respondida — Correta: <strong>${pergunta.opcoes[pergunta.indiceCorreto]}</strong></p>`;
    } else if (correta) {
      linhaResposta = `<p class="review-answer">Sua resposta: <strong>${pergunta.opcoesEmbaralhadas[pergunta.respostaUsuario.indiceEscolhido].texto}</strong> ✓</p>`;
    } else {
      const textoEscolhido = pergunta.opcoesEmbaralhadas[pergunta.respostaUsuario.indiceEscolhido].texto;
      linhaResposta = `<p class="review-answer">Sua resposta: <strong>${textoEscolhido}</strong> — Correta: <strong>${pergunta.opcoes[pergunta.indiceCorreto]}</strong></p>`;
    }

    elemento.innerHTML = `
      <p class="review-q">${indice + 1}. ${pergunta.enunciado}</p>
      ${linhaResposta}
      ${(!correta) ? `<p class="review-explain">${pergunta.explicacao}</p>` : ""}
    `;
    listaRevisao.appendChild(elemento);
  });
}
