import axios from 'axios';
import React from 'react';
import { API_UTENTE } from './api/api';

const FormRegistazione = (): JSX.Element => {
  const [nome, setNome] = React.useState<string>('');
  const [cognome, setCognome] = React.useState<string>('');
  const [eta, setEta] = React.useState<number>(0);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  // FUNZIONI
  function gestisciInserimento(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (!eta || eta < 18) {
      alert('Devi avere almeno 18 anni per registrarti.');
      return;
    }

    axios
      .post(API_UTENTE, {
        idUtente: 0,
        nome: nome,
        cognome: cognome,
        eta: eta,
        email: email,
        password: password,
      })

      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        alert('Inserimento non riuscito!');
      });
  }

  const validazionePassword = (e: React.ChangeEvent<HTMLInputElement>, set: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    if (value.includes(':')) {
      alert('La password non può contenere :');
    } else {
      set(value);
    }
  };

  return (
    <>
      <form>
        <label>Nome </label>
        <input id="nome" type="text" required value={nome} onChange={(e) => setNome(e.currentTarget.value)} />
        <br />
        <label>Cognome </label>
        <input type="text" required value={cognome} onChange={(e) => setCognome(e.currentTarget.value)} />
        <br />
        <label>Email </label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <br />
        <label>Password </label>
        <input type="password" required value={password} onChange={(e) => validazionePassword(e, setPassword)} />
        <br />
        <label>Età </label>
        <input type="number" min={18} value={eta} onChange={(e) => setEta(Number(e.currentTarget.value))} />
        <button onClick={(e) => gestisciInserimento(e)}>Inserisci</button>
      </form>
    </>
  );
};
export default FormRegistazione;
