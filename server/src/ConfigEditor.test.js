import ConfigEditor from './ConfigEditor';

const fs = require('fs');

describe('ConfigEditor Test', () => {

  beforeAll(() => {
    console.log = function () {
    };

    console.error = function () {
    };
  });

  it('adds a link to the config', () => {

    const configFile = 'some-filename';
    const featureConfig = new ConfigEditor(configFile);
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
      category: 'some-category',
      name: 'some-name',
      url: 'some-url',
      description: 'some-description',
    };
    let writtenResult;

    const readSpy = jest.spyOn(fs, 'readFileSync').mockImplementation(() => aMockConfig);
    const writeSpy = jest.spyOn(fs, 'writeFile').mockImplementation((configFile, updatedContent, callback) => {
      writtenResult = updatedContent;
      callback();
    });

    const sendPositiveResultFn = jest.fn();
    const sendNegResult = jest.fn();
    const gitReader = {
      commitConfig: jest.fn(),
    };

    featureConfig.addLink(linkPayload, sendPositiveResultFn, sendNegResult, gitReader);

    expect(writtenResult).
      toEqual(
        '[{"categoryName":"some-category","links":[{"url":"https://www.muicss.com/","name":"MUI CSS - React Components"},{"url":"some-url","name":"some-name","description":"some-description"}]}]');
    expect(gitReader.commitConfig.mock.calls.length).toBe(1);
    expect(gitReader.commitConfig.mock.calls[0][0]).toBe(sendPositiveResultFn);
    expect(gitReader.commitConfig.mock.calls[0][1]).toBe(sendNegResult);
    expect(JSON.stringify(gitReader.commitConfig.mock.calls[0][2])).toBe(writtenResult);

    gitReader.commitConfig.mockRestore();
    readSpy.mockRestore();
    writeSpy.mockRestore();
  });

  it('doesnt add a link if category doesnt match', () => {

    const configFile = 'some-filename';
    const featureConfig = new ConfigEditor(configFile);
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

    const readSpy = jest.spyOn(fs, 'readFileSync').mockImplementation(() => aMockConfig);
    const writeSpy = jest.spyOn(fs, 'writeFile').mockImplementation((configFile, updatedContent, callback) => {
      callback();
    });

    const sendPositiveResultFn = jest.fn();
    const sendNegResult = jest.fn();
    const gitReader = {
      commitConfig: jest.fn(),
    };

    featureConfig.addLink(linkPayload, sendPositiveResultFn, sendNegResult, gitReader);

    expect(gitReader.commitConfig.mock.calls.length).toBe(0);
    expect(writeSpy.mock.calls.length).toBe(0);

    readSpy.mockRestore();
  });

  it('sends negative result when validation fails', () => {

    const configFile = 'some-filename';
    const featureConfig = new ConfigEditor(configFile);
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

    const readSpy = jest.spyOn(fs, 'readFileSync').mockImplementation(() => aMockConfig);

    const sendPositiveResultFn = jest.fn();
    const sendNegResult = jest.fn();
    const gitReader = {
      commitConfig: jest.fn(),
    };

    featureConfig.addLink(linkPayload, sendPositiveResultFn, sendNegResult, gitReader);

    expect(sendNegResult.mock.calls.length).toBe(1);

    readSpy.mockRestore();
  });
});