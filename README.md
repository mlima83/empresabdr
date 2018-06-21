# Sistema Web em Java para cadastramento de veículos de uma locadora de automóveis.

Este projeto foi realizado para a avaliação da empresa DBR.

## Arquivos

- /doc - Documentação técnica
- /locadora - Projeto eclipse
- /dist - jar do projeto compilado

## Ferramentas necessárias

- Eclipse Neon 4.6.0 ou superior
- Node.js 8.11.1

## Configuração

1. Realize o clone deste repositório.
2. Importe o projeto pelo eclipse pelo caminho: File > Import > General > Existing Projects into workspace.
3. Aguarde o eclipse realizar o build e baixar todas as dependências.
4. Execute a classe LocadoraApplication.java, clicando com o botão direito em cima > Run as > Java Application.
5. Acesse no navegador http://localhost:8080

## Executando o projeto compilado

1. Baixe o jar dentro do diretório /dist
2. Pela linha de comando, navegue ate o diretório do jar e execute #java -jar locadora-0.0.1-SNAPSHOT.jar
3. Você verá o log inicialização do tomcat, aguarde o final da inicialização.
4. Acesse no navegador http://localhost:8080

## Dicas

Sempre que atualizar algo no em algum compoente React, recompile o node com a atalho alt+f5 > selecionando o projeto.

## Melhorias Futuras

1. Abstrair a lógica desse CRUD para servir como scaffold, melhorando a produtividade.
2. Abstrair o componente Modal para que seja reutilizado tanto na inserção quanto na alteração de um veículo.


