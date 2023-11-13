import 'dotenv/config'

const { BROKER_0, BROKER_1, BROKER_2, CLIENT_ID, TOPIC } = process.env
const consumerConfig = {
  BROKER_0,
  BROKER_1,
  BROKER_2,
  CLIENT_ID,
  TOPIC,
}

export default consumerConfig
