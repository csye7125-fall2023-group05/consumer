import { Kafka } from 'kafkajs'
import logger from './config/logger.config.js'
import consumerConfig from './config/app.config.js'

const { BROKER_0, BROKER_1, BROKER_2, CLIENT_ID, TOPIC } = consumerConfig
const topics = [TOPIC]
const groupId = process.argv[3] || 'consumerGroup'
const brokers = [BROKER_0, BROKER_1, BROKER_2]

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers,
})

const init = async () => {
  try {
    const consumer = kafka.consumer({ groupId })
    await consumer.connect()

    await consumer.subscribe({
      topics,
      fromBeginning: true,
    })

    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        logger.info(
          `${groupId}: [${topic}]: PART:${partition} Received message: ${message.value}`
        )
      },
    })
  } catch (error) {
    console.log(`Kafka producer error: ${error}`)
  }
}

init()
