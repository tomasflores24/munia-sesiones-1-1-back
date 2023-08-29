import {
    Model,
    Table,
    Column,
    DataType,
    PrimaryKey,
    AutoIncrement,
  } from 'sequelize-typescript';
  
  @Table({ 
    tableName: 'categories',
    timestamps: false,
  })
  export class Categories extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER, primaryKey: true })
    public id!: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;
  }