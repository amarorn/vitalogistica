import mongoose, { Document, Schema } from 'mongoose';

export interface IBudget extends Document {
  requestDate: Date;
  budgetNumber: string;
  client: string;
  uf: string;
  city: string;
  route: string;
  routeId: string;
  billingType: string;
  vehicleType: string;
  approximateTime: string;
  frequency: string;
  fixedPrice: number;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'excluido';
  sendDate?: Date;
  approvalDate?: Date;
  startDate?: Date;
  deletionDate?: Date;
  bdgInclusion: boolean;
  approvedBy?: string;
  dasaValidation?: string;
  suppliers: Array<{
    name: string;
    cnpj: string;
    proposedValue: number;
  }>;
  costs: {
    kmPerDay: number;
    daysQuantity: number;
    totalKm: number;
    fuelConsumption: number;
    extraHours: number;
    totalFuel: number;
    fuelValue: number;
    totalCost: number;
    profit: number;
    profitPercentage: number;
    taxes: number;
    finalValue: number;
  };
  variableCosts?: {
    excessKm: number;
    costPerExcessKm: number;
    employeeOvertime: number;
    tax2: number;
    totalCost3: number;
  };
  createdBy: mongoose.Types.ObjectId;
  updatedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const budgetSchema = new Schema<IBudget>({
  requestDate: {
    type: Date,
    required: true
  },
  budgetNumber: {
    type: String,
    required: true,
    unique: true
  },
  client: {
    type: String,
    required: true
  },
  uf: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  routeId: {
    type: String,
    required: true
  },
  billingType: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  approximateTime: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  },
  fixedPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['rascunho', 'enviado', 'aprovado', 'excluido'],
    default: 'rascunho'
  },
  sendDate: Date,
  approvalDate: Date,
  startDate: Date,
  deletionDate: Date,
  bdgInclusion: {
    type: Boolean,
    default: false
  },
  approvedBy: String,
  dasaValidation: String,
  suppliers: [{
    name: String,
    cnpj: String,
    proposedValue: Number
  }],
  costs: {
    kmPerDay: Number,
    daysQuantity: Number,
    totalKm: Number,
    fuelConsumption: Number,
    extraHours: Number,
    totalFuel: Number,
    fuelValue: Number,
    totalCost: Number,
    profit: Number,
    profitPercentage: Number,
    taxes: Number,
    finalValue: Number
  },
  variableCosts: {
    excessKm: Number,
    costPerExcessKm: Number,
    employeeOvertime: Number,
    tax2: Number,
    totalCost3: Number
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export const Budget = mongoose.model<IBudget>('Budget', budgetSchema); 