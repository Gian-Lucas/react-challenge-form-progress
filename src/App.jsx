/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [statusBarPercent, setStatusBarPercent] = useState(0);

  useEffect(() => {
    const fields = [name, email, maritalStatus, gender];

    const newStatusBarPercent = fields.reduce((percent, field) => {
      if (field.length !== 0) return percent + 25;

      return percent;
    }, 0);

    setStatusBarPercent(newStatusBarPercent);
  }, [name, email, maritalStatus, gender]);

  function reset() {
    setName("");
    setEmail("");
    setMaritalStatus("");
    setGender("");
    setStatusBarPercent(0);
  }

  function validateName(name) {
    const regex = /^[A-Za-z]+\s[A-Za-z]+([\s][A-Za-z]+)*$/;
    return regex.test(name);
  }

  function validateEmail(email) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  function isValidateFields() {
    return (
      gender.length !== 0 &&
      maritalStatus.length !== 0 &&
      validateEmail(email) &&
      validateName(name)
    );
  }

  function handleSubmit() {
    alert("Formulário enviado com sucesso!");

    reset();
  }

  return (
    <div className="App">
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        {/* crie a barra de progresso aqui */}
        <div className="bar-container">
          <div className="bar" style={{ width: `${statusBarPercent}%` }}></div>
        </div>
        <div className="form-group">
          <label htmlFor="name">Nome Completo</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="marital-status">Estado Civil</label>
          <select
            id="marital-status"
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
          >
            <option value="">- selecione...</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Gênero</label>
          <div className="radios-container">
            <span>
              <input
                name="gender"
                type="radio"
                value="Masculino"
                checked={gender === "Masculino"}
                onChange={(e) => setGender(e.target.value)}
              />
              Masculino
            </span>
            <span>
              <input
                name="gender"
                type="radio"
                value="Feminino"
                checked={gender === "Feminino"}
                onChange={(e) => setGender(e.target.value)}
              />
              Feminino
            </span>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={!isValidateFields()}>
          Enviar Formulário
        </button>
      </main>
    </div>
  );
}

export default App;
