// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import 'mutationobserver-shim'

jest.mock('src/aws-exports', () => ({
  aws_project_region: 'us-east-1',
  aws_cognito_identity_pool_id: 'us-east-1:4003eee5',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_uxdbOybLn',
  aws_user_pools_web_client_id: 'pbb3nvpbgbjdr8bmrnq5h87l1',
  oauth: {},
  aws_appsync_graphqlEndpoint: 'http://example.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_appsync_apiKey: 'da2-fakeApiId123456',
  aws_appsync_dangerously_connect_to_http_endpoint_for_testing: true,
  aws_cloud_logic_custom: [
    {
      name: 'AdminQueries',
      endpoint: 'https://example.com/dev',
      region: 'us-east-1'
    }
  ]
}))

jest.mock('aws-amplify', () => ({
  API: {
    graphql: jest.fn()
  },
  configure: jest.fn()
}))

jest.mock('src/graphql/mutations', () => ({
  createIdea: jest.fn()
}))

jest.mock('src/providers/Amplify', () => ({
  signOut: jest.fn(),
  generateUserDocument: jest.fn(),
  addVote: jest.fn(),
  getIdeas: jest.fn(),
  saveIdea: jest.fn(),
}))
