// import { Collaborator, Company, Provider } from '../../../models';
import { CreateUserDTO } from '../../user/dto/user';
import { AuthCollaboratorDTO, AuthCompanyDTO, AuthProviderDTO } from '../dto/auth';

enum TypesAuth {
  COMPANY = 'Empresa',
  COLLABORATOR = 'Colaborador',
  PROVIDER = 'Profesional',
}

type Type = TypesAuth.COLLABORATOR | TypesAuth.COMPANY | TypesAuth.PROVIDER;

type AuthInDBF = (
  profileData: AuthCompanyDTO | AuthProviderDTO | AuthCollaboratorDTO,
  userData: CreateUserDTO,
  type: Type
) => Promise<any>;

export { AuthInDBF, TypesAuth };
