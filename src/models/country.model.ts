import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
@Table({ 
  tableName: 'country',
  timestamps: false,
})
export class Country extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, primaryKey: true })
  public id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  area_code!: string;
}
