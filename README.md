# AtosTest

O projeto foi executado com o [Angular CLI](https://github.com/angular/angular-cli) version 16.2.8.
Utilizei a versão 16.2.0 do Angular pois meu cli já estava atualizado, espero que não tenha problema embora para o teste tenha sido pedido até a versão 14, acredito que não há grandes diferenças para este projeto.
Utilizei a biblioteca primeng (https://www.primefaces.org/primeng-v14-lts) para componentes de UI e o primeflex (https://primeflex.org/) para a responsividade.

## Running Backend

Para simular o backend foi utilizado o json-server, para executa-lo rodar: `npm run backend`
O servidor vai ficar disponvel na porta 3000

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Foram criados testes unitários para o backend.service e para o edit-popout.component.
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
