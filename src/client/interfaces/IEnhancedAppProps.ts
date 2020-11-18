import {IComponentWithLayout, ILayoutProps} from '@client/interfaces/ILayout';
import {AppProps} from 'next/app';

export default interface IEnhancedAppProps<P extends ILayoutProps> extends Omit<AppProps<P>, 'Component'> {
  Component: AppProps['Component'] & IComponentWithLayout<P>;
}
