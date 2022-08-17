import { defHttp } from '/@/utils/http/axios';
import { AnalysisResult } from './model/analysisModel';

enum Api {
  Analysis = '/sys/getAnalysis',
}

export const getAnalysis = () => {
  return defHttp.get<AnalysisResult>({ url: Api.Analysis });
};
