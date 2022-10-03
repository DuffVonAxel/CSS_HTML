var port;
var portaStatus = "OFF";

async function SelecionarPortaSerial(){
    if ("serial" in navigator) {
      // The Web Serial API is supported.
      document.getElementById('ler-serial').innerHTML = "Selecione uma porta serial...";  
      // Prompt user to select any serial port.
      port = await navigator.serial.requestPort();
      // Wait for the serial port to open.
      await port.open({ baudRate: 9600 });
      
    } else {
      alert("Porta Serial não suportada!");
    }    
}

async function LerPortaSerial(){
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();

    let i = 0;
    // Listen to data coming from the serial device.
    portaStatus = "ON";
    document.getElementById('status-porta').innerHTML = "Porta Status: " + portaStatus;
        
    while (portaStatus == "ON") {
      const { value, done } = await reader.read();
      if (done) {
        // Allow the serial port to be closed later.
        reader.releaseLock();
        break;
      }
      // value is a string.
      i++;
      document.getElementById('ler-serial').innerHTML = "recebido linha: " + i + " - " + value; 
    }
}

async function EscreverPortaSerial() {
  const textEncoder = new TextEncoderStream();
  const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
  const writer = textEncoder.writable.getWriter();
  
  document.getElementById('ler-serial').innerHTML = "escrevendo na porta serial...";

  let x = "";
  while (x != "x") {
    x = prompt("Digite 'a' para ligar LED\n" + 
               "Digite 'b' para Desligar LED\n" +
               "Digite 'x' para  Sair"
    );
    await writer.write(x);
  }
  writer.releaseLock();

  alert("Esta página será recarregada para reniciar porta serial");
  window.location.reload();
  
}