import mongoose from 'mongoose' // biblioteca para interagir com o mongodb
import config from 'config'

// conexão com o mongodb
mongoose.connect(config.get('mongo.uri'), {useNewUrlParser: true, useUnifiedTopology: true})

export default mongoose


