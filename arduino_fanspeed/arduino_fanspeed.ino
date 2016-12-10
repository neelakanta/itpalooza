int motor_pin = 13;
int motor_speed = 0;

void setup() 
{
  pinMode(BUILTIN_LED, OUTPUT);  
  
  Serial.begin(115200);
  pinMode(motor_pin,OUTPUT);
}

void loop() 
{
  Serial.println(motor_speed);
  analogWrite(motor_pin, 100);
  motor_speed += 100;
  if (motor_speed > 1023) {
     motor_speed = 0;
  }
}
