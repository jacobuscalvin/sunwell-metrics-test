import Metrics from "./metrics/MetricsRepo";

const repositories = {
    metrics: Metrics,
}

export const Repository = {
    get: name => repositories[name]
}