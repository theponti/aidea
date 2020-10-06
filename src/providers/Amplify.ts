import { API, Auth, graphqlOperation, Storage } from 'aws-amplify'
import { CreateIdeaInput, CreateIdeaMutation } from 'src/API'
import * as mutations from 'src/graphql/mutations'
import { listIdeas } from 'src/graphql/queries'
import { Idea } from 'src/interfaces/Idea'
import { User } from 'src/interfaces/User'

export const getUser = async () => {
  try {
    return await Auth.currentUserInfo()
  } catch (error) {
    console.error(error)
  }
}

export const updateUserPhoto = async (file: File) => {
  try {
    const user = await Auth.currentUserInfo()
    const fileResult = await Storage.put(`${user.id}/profile_photo.jpg`, file)
    const result = await Auth.updateUserAttributes(user, {
      'custom:photo_url': fileResult
    })
    return result
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

export const deleteUser = async (id: string) => {
  try {
    // Delete user
    await API.graphql(graphqlOperation(mutations.deleteUser, { input: { id } }))
    // Sign out of application
    return await Auth.signOut()
  } catch (error) {
    console.error(error)
  }
}

export async function addVote (ideaID: string, userID: string | undefined, vote: number) {
  try {
    const response = await API.graphql(
      graphqlOperation(
        mutations.createIdeaVote, 
        { input: { ideaID, userID, vote } }
      )
    )
  } catch (error) {
    console.error(error)
  }
}

export async function saveIdea (idea: CreateIdeaInput) {
  try {
    const { createIdea: response } = await (API.graphql(
      graphqlOperation(mutations.createIdea, { input: idea })
    ) as Promise<CreateIdeaMutation>)
    debugger
    return response
  } catch (error) {
    console.error(error)
  }
}

interface ListIdeasResult {
  data: {
    listIdeas: {
      items: Idea[]
    }
  }
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
