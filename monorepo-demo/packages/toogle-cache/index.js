class CacheEngine {
  constructor(engine, params) {
    this.engine = engine;
    this.params = params;

    this.engine.connect(params)
      .then(connected => {
        this.connected = true;
      })
      .catch(error => {
        this.connected = false;
        this.connectionFailed = true;
        this.connectionError = error;
      });
  }

  connect () {
    this.engine.connect(params);
  }

  get (key) {
    return this.connect()
      .then(connection => connection.get(key));
  }

  set (key, val, ttl) {
    return this.connect()
      .then(connection => connection.set(key, val, ttl));
  }

  del () {
    return this.connect()
      .then(connection => connection.del(key));
  }
}
