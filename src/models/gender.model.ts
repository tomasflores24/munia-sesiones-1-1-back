import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
@Table({ 
  tableName: 'gender',
  timestamps: false,
})
export class Gender extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, primaryKey: true })
  public id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;
}
