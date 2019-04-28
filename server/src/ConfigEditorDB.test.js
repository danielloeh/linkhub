import ConfigEditorDB from './ConfigEditorDB';

describe('ConfigEditorDB Test', () => {

  let database;

  beforeAll(() => {

    const aMockConfig = `[
      {
        "categoryName": "some-category",
        "links": [
          {
            "url": "https://www.muicss.com/",
            "name": "MUI CSS - React Components"
          }]
      }]`;

    database = {
      upsert: jest.fn(({ data }) => data),
      read: jest.fn(({callback}) => callback(aMockConfig)),
    };
  });

  afterEach(() => {
    database.upsert.mockRestore();
    database.upsert.mockRestore();
    database.read.mockRestore();
  });

  it('adds a link to the config', () => {

    const configEditor = new ConfigEditorDB(database);

    const linkPayload = {
      category: 'some-category',
      name: 'some-name',
      url: 'some-url',
      description: 'some-description',
    };

    const sendPositiveResultFn = jest.fn();
    const sendNegResult = jest.fn();
    const someUser = 'some-user';
    const tableName = 'links';

    configEditor.addLink(someUser, linkPayload, sendPositiveResultFn, sendNegResult);

    expect(database.read.mock.calls.length).toBe(1);
    expect(database.read).toBeCalledWith({ user: someUser, table: tableName, callback: expect.any(Function)});

    expect(database.upsert).toBeCalledWith({
      callback: sendPositiveResultFn, table: tableName, user: someUser, data:
        '[{"categoryName":"some-category","links":[{"url":"https://www.muicss.com/","name":"MUI CSS - React Components"},' +
        '{"url":"some-url","name":"some-name","description":"some-description"}]}]',
    });
  });

  it('doesnt add a link if category doesnt match', () => {

    const configEditor = new ConfigEditorDB(database);

    const aMockConfig = `[
      {
        "categoryName": "some-category",
        "links": [
          {
            "url": "https://www.muicss.com/",
            "name": "MUI CSS - React Components"
          }]
      }]`;
    const linkPayload = {
      category: 'some-other-category',
      name: 'some-name',
      url: 'some-url',
      description: 'some-description',
    };

    const writeSpy = jest.spyOn(database, 'upsert').mockImplementation(() => {});

    const readSpy = jest.spyOn(database, 'read').mockImplementation(() => aMockConfig);

    const sendPositiveResultFn = jest.fn();
    const sendNegResult = jest.fn();

    configEditor.addLink('some-user', linkPayload, sendPositiveResultFn, sendNegResult);

    expect(database.upsert.mock.calls.length).toBe(0);
    expect(writeSpy.mock.calls.length).toBe(0);

    readSpy.mockRestore();
  });

  it('sends negative result when validation fails', () => {

    const configEditor = new ConfigEditorDB(database);
    const aMockConfig = `[
      {
        "categoryName": "some-category",
        "invalidFormat" : "inThisSchema"
      }]`;
    const linkPayload = {
      category: 'some-category',
      name: 'some-name',
      url: 'some-url',
      description: 'some-description',
    };

    const readSpy = jest.spyOn(database, 'read').mockImplementation(({callback}) => callback(aMockConfig));

    const sendPositiveResultFn = jest.fn();
    const sendNegResult = jest.fn();

    configEditor.addLink('some-user', linkPayload, sendPositiveResultFn, sendNegResult);

    expect(sendNegResult.mock.calls.length).toBe(1);

    readSpy.mockRestore();
  });
});