# Vidra JS Exercise Pasquale Merolle FE

----

### Requirements

- node v10.15
- npm v6.4
  
### Running INFO

- run `npm install` to install all needed packages
- run `npm run promises` to start the app using promises
- run `npm run asyncawait` to start the app using async/await

----

### Answers

#### 1. risolvi il piccolo esercizio js che trovi in allegato

Ho deciso di proporre due soluzioni al problema, una utilizzando le Promises e l'altra con Async/Await. Questo perchè la consegna era di non utilizzare versioni di ES maggiori della 6, altrimenti avrei preferito l'utilizzo di Async/Await

Il file `index.js ` può essere lanciato da script nel `package.json` (vedi sopra).

Ho preferito utilizzare webpack per il server di sviluppo per avere gli oggetti del DOM a disposizione e fornire una minima resa grafica. Considero tra l'altro Webpack lo standard per lo sviluppo web front-end, essendo molto configurabile ed estensibile

#### 2. spiega, come lo spiegheresti a un collega, cosa sono le callback, le promise e async/await. Spiegando anche le relative differenze e vantaggi/svantaggi

in JS le callback sono funzioni che vengono chiamate dopo l'esecuzione di una funzione: vengono passate ad una funzione ed eseguite dopo che la prima funzione ha terminato l'esecuzione.
Se in JS ho due funzioni, e una ci mette più tempo dell'altra ad ritornare un valore, non importa l'ordine in cui le scrivo, l'output di una funzione che richiede più tempo di elaborazione arriverà dopo quella che ne richiede meno.

```
  function printAll(){
    printString("A")
    printString("B")
    printString("C")
  }
  printAll()
```

Per utilizzare il risultato di una funzione che richiede molto tempo di elaborazione (ad esempio una chiamata asincrona a una API), posso passare a questa funzione una funzione di "callback" che verrà eseguita all'interno della prima. Così facendo sono sicuro di avere il risultato della prima funzione a disposizione della seconda:

```

function printString(string, callback){
  setTimeout(
    () => {
      console.log(string)
      callback()
    }, 
    Math.floor(Math.random() * 100) + 1
  )
}

function printAll(){
  printString("A", () => {
    printString("B", () => {
      printString("C", () => {})
    })
  })
}
printAll()

```
Come si vede, l'utilizzo di funzioni innestate una dentro l'altra porta al cosiddetto "Callback Hell": in presenza di innesti continui il codice diventa illegibile e poco manutenibile. Per ovviare a questo problema possiamo usare le Promises.

Una `Promise` è un costrutto di JS che permette l'esecuzione asincrona del codice, fornendo un output in caso di risoluzione positiva dell'elaborazione e uno in caso di esecuzione andata male. Di base è appunto una "Promessa" che il codice ritornerà un valore che può essere successivamente utilizzato.

Una Promise deve essere instanziata e prende come parametro una funzione con `resolve` e `reject` come argomenti. `resolve` serve a risolvere la promise, `reject` a rifiutarla. 

Una promise può trovarsi in tre stati:

  - `fullfilled (risolta)`: il valore della promise è disponibile, la chiamata asincrona a cui si riferisce ha restituito un valore
  - `rejected (rifiuta)`: la chiamata asincrona non ha restituito un valore (ad esempio per il verificarsi di un errore)
  - `pending`: quando non si trova in uno dei casi precedenti

```
function printString(string){
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
       console.log(string)
       resolve()
      },
     Math.floor(Math.random() * 100) + 1
    )
  })
}

function printAll(){
  printString("A")
  .then(() => printString("B"))
  .then(() => printString("C"))
  .catch(err => console.error(err)) // il blocco catch serve per gestire l'errore
  .finally(() => console.info('end')) // il blocco finally viene eseguito in ogni caso
}
printAll()
```

Await/Async, introdotto con la versione ES7 di Javascript, è un cosiddetto syntactic sugar per le Promise: in pratica rende la lettura del codice asincrono più vicina a quella di un codice sincrono, quindi più comprensibile e leggibile.

Per utilizzare questo modo di scrivere bisogna scrivere `await` prima della funzione asincrona che stiamo andando ad eseguire e che ritorna una `Promise`, e flaggare come `async` la funzione che le utilizza (altrimenti viene lanciato un errore)

```
function printString(string){
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
       console.log(string)
       resolve()
      },
     Math.floor(Math.random() * 100) + 1
    )
  })
}

async function printAll(){
  try {
    await printString("A")
    await printString("B")
    await printString("C")
  } catch (err){
    console.error(err);
  }
}
printAll()
```

L'utilizzo di Async/Await rende il codice più chiaro e manutenibile rispetto ai precedenti metodi di gestione dell'asincronicità, ma va tenuto conto del supporto ancora non completo dei browser e prevedere dei polyfill

#### 3. spiega, come lo spiegheresti in una chat di sviluppatori, cos'è il prototype e come funziona

Il Prototype è il modo che ha Javascript per creare degli oggetti che abbiano dei metodi ereditati da un oggetto base. Se ad esempio creo uno User e gli assegno il metodo info

```
const User = function(name, age) {
  this.name = name
  this.age = age
}

User.prototype.info = function() {
  console.log(`Mi chiamo ${this.name} e ho ${this.age} anni`)
}
```
Poi posso utilizzare i metodi dell'Oggetto appena creato in un altro oggetto, che erediterà quindi le sue funzionalità, e potrà condividerne il prototype:
```

const Customer = function(name, age) {
  User.call(this)
  this.name = name
  this.age = age
}

Customer.prototype = Object.create(User.prototype); // il prototype del Customer adesso è lo stesso dello User
Customer.prototype.constructor = Customer;

const anna = new Customer('Anna', 24);
anna.info() // logga: 'Mi chiamo Anna e ho 24 anni'
```

Dalla versione ES6 è possibile utilizzare le classi anche in JS per ottenere lo stesso risultato. Le classi in ES6 infatti non sono altro che syntactic sugar per scrivere in maniera più semplice il prototype di un oggetto:

```
class User {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  info() {
    console.log(`Mi chiamo ${this.name} e ho ${this.age} anni`)
  }
}

class Customer extends User {
  constructor(name, age) {
    super()
    this.name = name
    this.age = age
  }
}

const anna = new Customer('Anna', 24);
anna.info() // logga: 'Mi chiamo Anna e ho 24 anni'
```

#### 4. infine, scrivici cosa pensi che faccia davvero la differenza in positivo e in negativo durante lo sviluppo di un progetto. Porta esempi reali se ne hai avuti.

Lavoro con SCRUM, quindi direi che prima di tutto la metodologia di sviluppo è importante, il team deve sentirsi responsabile del lavoro che sta svolgendo e nessuno deve rimanere indietro.

è molto importante avere Feedback da parte del cliente e dell'utente finale. Più delle skills tecniche, è importante l'umiltà e la visione globale del processo di sviluppo: se si impara a valutare l'effort di un team su un determinato task si possono prendere decisioni migliori per tutti.

La persona viene prima dello sviluppatore, uno sviluppatore che si sente trattato come numero prima o poi perderà il commitment e la sua produttività peggiorerà. Va incentivato e preservato un giusto bilanciamento vita/lavoro.

Secondo me bisogna scrivere pensando che altre persone metteranno mano al tuo codice e dovrebbero capirlo nel più breve tempo possibile, quindi si a commenti, documentazione, codice leggibile, no a 'one-line-function' solo per fare i fighi.

è vitale saper chiedere aiuto, in un team che lavora con scadenze ravvicinate i problemi sorgono quando qualcuno, per paura o eccessiva presunzione, non condivide i problemi che lo bloccano, danneggiando il lavoro del team tutto.

Per ultimo, indico la passione per il codice, il voler fare quel passettino in più, anche se magari non è richiesto, perchè ci piace scrivere del codice fatto bene, per noi prima che per gli altri.

-----
### Docker Development

Optionally, you can run the application in a Docker container.
you don't need Node on your machine, just Docker v19.

#### Build the image
- run `docker image build ./ -t vidranode`

#### Run the app (promises or asyncawait version)
- run `docker run -p 8080:8080 --name vidraapp vidranode npm run docker-promises`
- run `docker run -p 8080:8080 --name vidraapp vidranode npm run docker-asyncawait`

The app is running at `http://0.0.0.0:8080/`

#### Remove app container
- run `docker container rm --force vidraapp`

#### Remove image
- run `docker image rm vidranode`