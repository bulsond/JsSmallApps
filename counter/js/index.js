import repository from './repository.js';
import counter from './counter.js';
import app from './app.js';

repository.init(window.localStorage);
counter.init(repository)
app.run(window.document, counter);
