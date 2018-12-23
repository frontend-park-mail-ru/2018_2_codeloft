import * as React from 'react';
import b from '../../middleware/b';
import styled from 'styled-components';
import '../Label/Lable.scss';

interface IProps {
  imgSrc: string;
  imgClass: string;
}

interface IState {
}

export default class Label extends React.Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
  };

  public constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {imgSrc} = this.props;
    const {imgClass} = this.props;

    return (
        <img className={ imgClass } src={ imgSrc }/>
    );
  }
}
