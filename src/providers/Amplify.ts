import { API, Auth, graphqlOperation, Storage } from 'aws-amplify'
import { listIdeas } from 'src/graphql/queries'
import { User } from 'src/interfaces/User'

export const getUser = async () => {
  try {
    return await Auth.currentUserInfo()
  } catch (error) {
    console.error(error)
  }
}

interface UpdateUserInput {
  'custom:displayName': string
}

export const updateUser = async (attributes: UpdateUserInput) => {
  try {
    const user = await Auth.currentAuthenticatedUser()
    const result = await Auth.updateUserAttributes(user, attributes)
    return result
  } catch (error) {
    console.error(error)
  }
}

export async function addIdeaToUser (id: string) {
  console.error('Implement this')
}

export const addVoteToUser = async (ideaUID: string) => {
  console.error('Implement this')
}

export async function addVoteToIdea (id: string, amount: Number) {
  console.error('Implement this')
}

export async function saveIdea (idea: string) {
  console.error('Implement this')
}

export const signInWithGoogle = () => {
  console.error('Implement this')
}

export const signOut = () => {
  console.error('Implement this')
}

interface ListIdeasResult {
  data: {
    listIdeas: {
      items: Idea[]
    }
  }
}
interface Idea {
  id: string;
  title: string;
  description: string;
}

export const getIdeas = async (): Promise<Idea[] | undefined> => {
  try {
    const { data: { listIdeas: ideas } } = await (API.graphql(graphqlOperation(listIdeas)) as Promise<ListIdeasResult>)
    return ideas.items
  } catch (error) {
    console.error(error)
  }
}

export const generateUserDocument = async (user: User, additionalData: string) => {
  console.error('Implement this')
}
