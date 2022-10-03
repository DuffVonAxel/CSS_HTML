#define led 13
#define som 8

void setup() {
  pinMode(led, OUTPUT);
  pinMode(som, OUTPUT);
  analogWrite(botaoA, INPUT);
  analogWrite(botaoB, INPUT);
  Serial.begin(9600);
    
}

char letra;

void loop() {
  if (Serial.available() > 0) {
    letra = Serial.read();
    if (letra == 'A' || letra == 'a') {
      digitalWrite(led, HIGH);
      digitalWrite(som, HIGH);
      delay(500);
      digitalWrite(som, LOW);
      Serial.println("Ligado");
      
    }
    if (letra == 'B' || letra == 'b') {
      digitalWrite(13, LOW);
      digitalWrite(som, HIGH);
      delay(500);
      digitalWrite(som, LOW);
      delay(500);
      digitalWrite(som, HIGH);
      delay(500);
      digitalWrite(som, LOW);
      Serial.println("Desligado");
    }    
  }
  //FIM
}
