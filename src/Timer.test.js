import '../test/setup';
import React from 'react';
import Timer from './Timer';
import { shallow } from 'enzyme';

class FakeApi {
  send(command) {
    this.lastCommand = command;
    return Promise.resolve({ ok: true, status: 200 });
  }
}

it('renders an empty timecode', () => {
  const wrap = shallow(<Timer />);

  expect(wrap.containsMatchingElement(<h2>00:00</h2>)).toBeTruthy();
});
it('adds a minute', () => {
  const wrap = shallow(<Timer />);

  wrap.find('#addMinute').simulate('click');
  expect(wrap.state('seconds')).toEqual(60);
});

it('adds 30 seconds', () => {
  const wrap = shallow(<Timer />);

  wrap.find('#addHalfMinute').simulate('click');
  expect(wrap.state('seconds')).toEqual(30);
});

it('adds 15 seconds', () => {
  const wrap = shallow(<Timer />);

  wrap.find('#addQuarterMinute').simulate('click');
  expect(wrap.state('seconds')).toEqual(15);
});

it('add different time increments', () => {
  const wrap = shallow(<Timer />);

  wrap.find('#addMinute').simulate('click');
  wrap.find('#addQuarterMinute').simulate('click');
  wrap.find('#addHalfMinute').simulate('click');

  expect(wrap.state('seconds')).toEqual(105);
});

it('displays a timecode of the given seconds', () => {
  const wrap = shallow(<Timer />);

  wrap.setState({ seconds: 754 });

  expect(wrap.containsMatchingElement(<h2>12:34</h2>)).toBeTruthy();
});

it('has a maximum allowed time', () => {
  const wrap = shallow(<Timer />);

  wrap.setState({ seconds: 5999 });
  expect(wrap.containsMatchingElement(<h2>99:59</h2>)).toBeTruthy();

  wrap.find('#addMinute').simulate('click');
  wrap.find('#addHalfMinute').simulate('click');
  wrap.find('#addQuarterMinute').simulate('click');

  // seconds should never be above maximum
  expect(wrap.state('seconds')).toEqual(5999);
});

it('starts timer with given seconds', () => {
  const wrap = shallow(<Timer />);

  wrap.setState({ seconds: 45 });

  const fakeApi = new FakeApi();
  wrap.instance().api = fakeApi;

  wrap.find('#startTimer').simulate('click');

  expect(fakeApi.lastCommand).toEqual('45');
})

it('resets timer', () => {
  const wrap = shallow(<Timer />);

  const fakeApi = new FakeApi();
  wrap.instance().api = fakeApi;

  wrap.find('#resetTimer').simulate('click');

  expect(fakeApi.lastCommand).toEqual('reset');
})

it('pauses timer', () => {
  const wrap = shallow(<Timer />);

  const fakeApi = new FakeApi();
  wrap.instance().api = fakeApi;

  wrap.find('#pauseTimer').simulate('click');

  expect(fakeApi.lastCommand).toEqual('pause');
})

it('resumes timer', () => {
  const wrap = shallow(<Timer />);

  const fakeApi = new FakeApi();
  wrap.instance().api = fakeApi;

  wrap.find('#resumeTimer').simulate('click');

  expect(fakeApi.lastCommand).toEqual('resume');
})
