import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  IsUUID,
} from 'sequelize-typescript';

@Table({ tableName: 'provider', timestamps: false })
export class Provider extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  public id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  last_name!: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  mon!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  tue!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  wed!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  thu!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  fri!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  sat!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  sun!: boolean;

  @Column({ type: DataType.STRING })
  monStart!: string;

  @Column({ type: DataType.STRING })
  monEnd!: string;

  @Column({ type: DataType.STRING })
  tueStart!: string;

  @Column({ type: DataType.STRING })
  tueEnd!: string;

  @Column({ type: DataType.STRING })
  wedStart!: string;

  @Column({ type: DataType.STRING })
  wedEnd!: string;

  @Column({ type: DataType.STRING })
  thuStart!: string;

  @Column({ type: DataType.STRING })
  thuEnd!: string;

  @Column({ type: DataType.STRING })
  friStart!: string;

  @Column({ type: DataType.STRING })
  friEnd!: string;

  @Column({ type: DataType.STRING })
  satStart!: string;

  @Column({ type: DataType.STRING })
  satEnd!: string;

  @Column({ type: DataType.STRING })
  sunStart!: string;

  @Column({ type: DataType.STRING })
  sunEnd!: string;
    
}