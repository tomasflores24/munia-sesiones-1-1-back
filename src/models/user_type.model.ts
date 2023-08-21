import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ 
  tableName: 'user_type',
  timestamps: false,
})
export class User_type extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, primaryKey: true })
  public id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;
}
