# Jogo Interativo (Quiz) - Conscientização Ambiental Corporativa

Quiz desenvolvido com HTML, CSS e JavaScript sobre a separação de resíduos, baseado na Cartilha Ambiental de empresa privada.
Os resultados são armazenados no Supabase, com o objetivo de permitir a posterior análise do desempenho dos colaboradores.
Essa análise possibilita o entendimento mais assertivo do nível de conhecimento dos colaboradores sobre o descarte de resíduos, além de auxiliar a empresa a identificar as principais dificuldades enfrentadas nesse processo. Com base nesses dados, torna-se possível desenvolver planos de ação voltados à capacitação e à conscientização dos colaboradores sobre o descarte correto de resíduos.

# Estrutura

```
projeto_atividade_extensionista/
├── assets/(imagens e cartilha-ambiental.pdf)
├── index.html
├── LICENSE
├── README.md
├── script.js
├── style.css
└── supabase-schema.sql
```

# Configuração

1 - No SQL Editor referente ao Supabase, é necessário executar o conteúdo de 'supabase-schema.sql', que resulta na criação da tabela 'quiz_resultados'.
2 - As credenciais do Supabase ('SUPABASE_URL' e 'SUPABASE_ANON_KEY') constam no arquivo 'script.js'.
3 - Para acesso ao site, é necessário a abertura do arquivo 'index.html' no navegador ou o uso, por exemplo, da extensão Live Server junto ao VS Code.

# Consultar resultados

A consulta dos resultados deve ser efetuada por meio do Supabase, em Table Editor -> quiz_resultados, ou via comando SQL abaixo:

```
select * from quiz_resultados order by data_hora desc;
```

# Assets

Para visualização das imagens e da cartilha, é necessária a inserção em 'assets/':
1 - Imagens de cada categoria, referenciadas em 'METADADOS_CATEGORIA' (script.js).
2 - 'cartilha-ambiental.pdf', para acesso ao final do quiz (index.html).
