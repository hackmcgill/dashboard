// import { Box, Flex } from '@rebass/grid';
import * as React from 'react';
import { Hacker } from '../api';
import { HackerStatus, IStats, JobInterest } from '../config';
import { getNestedAttribute } from '../util';

interface IStatsState {
  stats: IStats | null;
  loading: boolean;
}

export default class StatsComponent extends React.Component<{}, IStatsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: true,
      stats: null,
    };
  }
  public render() {
    const { stats, loading } = this.state;
    if (loading) {
      return <div>loading...</div>;
    } else if (stats !== null) {
      return this.renderStats();
    } else {
      return <div>Error</div>;
    }
  }

  public async componentDidMount() {
    try {
      const statsResponse = await Hacker.getStats();
      const stats: IStats | null = getNestedAttribute(statsResponse, [
        'data',
        'data',
        'stats',
      ]);
      this.setState({ stats, loading: false });
    } catch (e) {
      console.log('Error while getting stats', e);
      this.setState({ loading: false });
    }
  }
  private renderStats() {
    const { stats } = this.state;
    if (!stats) {
      return <div />;
    }
    /*
     *   total: number;
     *  status: { [key in HackerStatus]: number };
     *  school: { [key: string]: number };
     *  degree: { [key: string]: number };
     *  gender: { [key: string]: number };
     *  needsBus: { true: number; false: number };
     *  ethnicity: { [key: string]: number };
     *  jobInterest: { [key in JobInterest]: number };
     *  major: { [key: string]: number };
     *  graduationYear: { [key: string]: number };
     *  dietaryRestriction: { [key in DietaryRestriction & string]: number };
     *  ShirtSize: { [key in ShirtSize]: number };
     *  age: { [key: string]: number };
     */
    const total = <div>{stats.total}</div>;
    const statusList = Object.keys(stats.status).map(
      (k: HackerStatus, index) => {
        return (
          <li key={index}>
            {k}: {stats.status[k]}
          </li>
        );
      }
    );
    const schoolList = Object.keys(stats.school).map((k: string, index) => {
      return (
        <li key={index}>
          {k}: {stats.school[k]}
        </li>
      );
    });
    const degreeList = Object.keys(stats.degree).map((k: string, index) => {
      return (
        <li key={index}>
          {k}: {stats.degree[k]}
        </li>
      );
    });
    const genderList = Object.keys(stats.gender).map((k: string, index) => {
      return (
        <li key={index}>
          {k}: {stats.degree[k]}
        </li>
      );
    });
    const needsBusList = Object.keys(stats.needsBus).map((k: string, index) => {
      return (
        <li key={index}>
          {k}: {stats.needsBus[k]}
        </li>
      );
    });
    const ethnicityList = Object.keys(stats.ethnicity).map(
      (k: string, index) => {
        return (
          <li key={index}>
            {k}: {stats.needsBus[k]}
          </li>
        );
      }
    );
    const jobInterestList = Object.keys(stats.jobInterest).map(
      (k: JobInterest, index) => {
        return (
          <li key={index}>
            {k}: {stats.needsBus[k]}
          </li>
        );
      }
    );
    const majorList = Object.keys(stats.jobInterest).map((k: string, index) => {
      return (
        <li key={index}>
          {k}: {stats.needsBus[k]}
        </li>
      );
    });

    return (
      <div>
        Total applicants: {total}
        Status: <ul>{statusList}</ul>
        School: <ul>{schoolList}</ul>
        Degree: <ul>{degreeList}</ul>
        Gender: <ul>{genderList}</ul>
        Needs bus: <ul>{needsBusList}</ul>
        Ethnicity: <ul>{ethnicityList}</ul>
        Job interest: <ul>{jobInterestList}</ul>
        Majors: <ul>{majorList}</ul>
      </div>
    );
  }
}
