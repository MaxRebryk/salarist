import { RootState } from "../store";

export const selectSallary = (state: RootState) =>
  state.sallary.worker?.sallary;
export const selectWorkDays = (state: RootState) =>
  state.sallary.worker?.workDays;
export const selectFine = (state: RootState) => state.sallary.worker?.fine;
export const selectWorkerType = (state: RootState) =>
  state.sallary.worker?.userType;
export const selectWorker = (state: RootState) => state.sallary.worker;
export const selectWorkers = (state: RootState) => state.sallary.workers;
export const selectLoading = (state: RootState) => state.sallary.loading;
export const selectError = (state: RootState) => state.sallary.error;
