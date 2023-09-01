import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({ tableName: 'session_per_collaborators' })
export class Session_per_collaborators extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, primaryKey: true })
  public id!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  number_sessions!: number;
}
