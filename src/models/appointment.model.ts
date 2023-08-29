import {
    Model,
    Table,
    Column,
    DataType,
    PrimaryKey,
    AutoIncrement,
  } from 'sequelize-typescript';
  
  @Table({ 
    tableName: 'appointment',
    timestamps: false,
  })
  export class Appointment extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, primaryKey: true })
    public id!: string;

  }