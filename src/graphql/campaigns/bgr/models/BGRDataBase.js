import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const model = mongoose.model;

const statusTypes = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
});

const mediumTypes = Object.freeze({
  WHATSAPP: 'WHATSAPP',
  EMAIL: 'EMAIL',
});

const wpStatusSchema = new Schema(
  {
    name: {
      type: String
    },
    times_reached: {
      type: Number,
      default: 1
    },
    last_reach: {
      type: Date
    },
    line: {
      type: String
    }
  },{_id: false}
);

const emailStatusSchema = new Schema(
  {
    name: {
      type: String
    },
    times_reached: {
      type: Number,
      default: 0
    },
    last_reach: {
      type: Date
    },
    email: {
      type: String
    }
  },{_id: false}
);

const campaignStatusSchema = new Schema(
  {
    name: {
      type: String
    },
    assistance_status: {
      type: String,
      enum: Object.values(statusTypes),
      default: statusTypes.INACTIVE, 
    },
    activation_date: {
      type: String
    },
    cancellation_date: {
      type: String
    },
    medium: {
      type: String,
      enum: Object.values(mediumTypes)
    }
  },{_id: false}
)

const statusSchema = new Schema(
  {
    wp_status: [
      {
        type: wpStatusSchema
      }
    ],
    email_status: [
      {
        type: emailStatusSchema
      }
    ],
    campaign_status: [
      {
        type: campaignStatusSchema
      }
    ]
  },{_id: false}
);

const clientSchema = new Schema(
  {
    name: {
      type: String,
    },
    identification: {
      type: String,
    },
    phone: {
      type: String,
    },
    IGS_status: {
      type: statusSchema,
    },
  },
  {
    timestamps: true,
  }
);

const clientStatusSchema = new Schema(
  {
    client: {
      type: String,
      ref: 'Client',
      required: true,
    },
    wp_status: {
      type: String,
      enum: Object.values(statusTypes),
      default: statusTypes.ACTIVE, //Registro de si el numero tiene Whatsapp o No
    },
    sended: {
      //Contador de mensajes enviados
      type: Number,
    },
    date_sended: {
      //Registro de Fecha de Envío
      type: String,
    },
    date_activated: {
      //Registro de Fecha de Activacion
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


export function Clients(collection) {
  return model(collection, clientSchema, collection);
}

/*export const BGRClientsTC = model('BGRClientsTC', clientSchema);
export const BGRClientsC = model('BGRClientsC', clientSchema);
export const BGRClientsTCStatus = model('BGRClientsTCStatus', clientStatusSchema);
export const BGRClientsCStatus = model('BGRClientsCStatus', clientStatusSchema);*/
export const IGSStatus = model('IGSStatus', statusSchema);
export const WPStatus = model('WPStatus', wpStatusSchema);

export const WP_status = statusTypes;
