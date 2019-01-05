import * as React from 'react';
import { Hacker } from '../api';
import { IStats } from '../config';
import { getNestedAttr } from '../util';
import { SingleStatComponent } from './SingleStat';

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
      const stats: IStats | null = getNestedAttr(statsResponse, [
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
    return (
      <div>
        Total applicants: {total}
        <SingleStatComponent statName="Status" stat={stats.status} />
        <SingleStatComponent statName="School" stat={stats.school} />
        <SingleStatComponent statName="Degree" stat={stats.degree} />
        <SingleStatComponent statName="Gender" stat={stats.gender} />
        <SingleStatComponent statName="Needs bus" stat={stats.needsBus} />
        <SingleStatComponent statName="Ethnicity" stat={stats.ethnicity} />
        <SingleStatComponent statName="Job interest" stat={stats.jobInterest} />
        <SingleStatComponent statName="Majors" stat={stats.major} />
        <SingleStatComponent statName="Grad Year" stat={stats.graduationYear} />
        <SingleStatComponent
          statName="Dietary Restrictions"
          stat={stats.dietaryRestrictions}
        />
        <SingleStatComponent statName="Shirt Size" stat={stats.shirtSize} />
        <SingleStatComponent statName="Age" stat={stats.age} />
      </div>
    );
  }
}
