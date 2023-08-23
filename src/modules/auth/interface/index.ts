import { Collaborator, Company, Provider } from '../../../models';
import { CreateUserDTO } from '../../user/dto/user';
import { AuthCollaboratorDTO, AuthCompanyDTO, AuthProviderDTO } from '../dto/auth';

export enum TypesAuth {
  COLLABORATOR = 'collaborator',
  PROVIDER = 'provider',
  COMPANY = 'company',
}

type Type = TypesAuth.COLLABORATOR | TypesAuth.COMPANY | TypesAuth.PROVIDER;
type ModelsAuth = Company | Provider | Collaborator | undefined;

type AuthInDBF = (
  profileData: AuthCompanyDTO | AuthProviderDTO | AuthCollaboratorDTO,
  userData: CreateUserDTO,
  type: Type
) => Promise<ModelsAuth>;

export { AuthInDBF };
