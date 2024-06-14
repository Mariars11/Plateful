*** Settings ***
Library        SeleniumLibrary
Library    DateTime

*** Variables ***

#URLS
${URL}         http://localhost:8080/Cadastrar
${Main}        http://localhost:8080
${edit}        http://localhost:8080/editar_perfil/2
${list}        http://localhost:8080/lista_itens/1?
${editList}    http://localhost:8080/editar_item/1/1/?
${estabela}    http://localhost:8080/editar_estabelecimento/1?
${home}        http://localhost:8080/home

#Informacoes do Usuario
${name}        administrador
${date}        10-09-2002
${email}       admin@gmail.com
${senha}       catolica

#Informacoes do Estalecimento
${nomeE}        McDonalds
${unidade}      Taguatinga
${nomeBK}       Burguer King
${unidadeBK}    Ceilandia

#Informacoes
${produto}      bigmac
${price}        15
${nota}         4
${BK}           Burguer King
${price2}       20
${nota2}        5
*** Test Cases ***
Caso de teste 1: Abrir o site
    Open Browser        ${URL}        firefox

Caso de teste 2: Cadastro de Usuario
    Input Text    id=nome    ${name}
    #Tratamento da DATA
    ${date}        Get Current Date    result_format=%Y-%m-%d
    Input Text    id=data_nascimento    ${date}
    Input Text    id=email    ${email}
    Input Password    id=senha    ${senha}  
    Click Button    id=btn-cadastro

Caso de teste 3: Login Usuario
    Go To    ${Main}      
    Input Text    id=email     ${email}
    Input Text    id=senha     ${senha}
    Click Button    id=btn-login
Caso de teste 4: Add Estalecimento
    Click Button    id=btn-addProduct
    Input Text    id=nome    ${nomeE} 
    Input Text    id=unidade    ${unidade} 
    Click Button    id=btn-login

Caso de teste 5: Add produto
    Click Element    locator=//*[@id="div-cards"]/div[1]/div/div/div[2]/div[1]/form/button/span
    Click Button    id=btn-addProduct
    Input Text    id=titulo    ${produto}
    Input Text    id=preco    ${price} 
    Input Text    id=nota    ${nota}
    Click Button    id=btn-login

Caso de teste 6: Editar um item
    Click Element    locator=//*[@id="div-cards"]/div/div/div/div[3]/div[1]/form/button/span
    Input Text    id=titulo    ${BK} 
    Input Text    id=preco    ${price2} 
    Click Button    id=btn-login

Caso de teste 7: Edit um Estalecimento
    Go To   ${home}
    Click Element    locator=//*[@id="div-cards"]/div[1]/div/div/div[2]/div[2]/form/button/span
    Input Text    id=nome    ${nomeBK}  
    Input Text    id=nome    ${unidadeBK}    
    Click Button    id=btn-login

Caso de teste 8: removendo item
    Click Element    locator=//*[@id="div-cards"]/div[1]/div/div/div[2]/div[1]/form/button/span
    Click Element    locator=//*[@id="div-cards"]/div[1]/div/div/div[3]/div[2]/form/button/span

Caso de teste 9: removendo Estalecimento
    Go To    ${home}
    
    Click Button    locator=//*[@id="div-cards"]/div[1]/div/div/div[2]/div[3]/form/button
    
    