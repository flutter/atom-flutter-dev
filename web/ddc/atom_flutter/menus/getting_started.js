dart_library.library('atom_flutter/menus/getting_started', null, /* Imports */[
  'dart/_runtime',
  'dart/core',
  'atom/utils/disposable',
  'atom/atom',
  'atom/node/shell',
  'atom/utils/utils',
  'atom/node/process',
  'atom_flutter/state',
  'dart/async'
], /* Lazy imports */[
], function(exports, dart, core, disposable, atom, shell, utils, process, state, async) {
  'use strict';
  let dartx = dart.dartx;
  const _gettingStarted = Symbol('_gettingStarted');
  const _handleSendFeedback = Symbol('_handleSendFeedback');
  class GettingStarted extends core.Object {
    GettingStarted() {
      this.disposables = new disposable.Disposables();
      this.disposables.add(atom.atom.commands.add('atom-workspace', 'flutter:getting-started', dart.bind(this, _gettingStarted)));
      this.disposables.add(atom.atom.commands.add('atom-workspace', 'flutter:send-feedback', dart.bind(this, _handleSendFeedback)));
    }
    dispose() {
      return this.disposables.dispose();
    }
    [_gettingStarted](_) {
      shell.shell.openExternal('http://flutter.io/getting-started/');
    }
    [_handleSendFeedback](_) {
      getSystemDescription().then(dart.fn(description => {
        shell.shell.openExternal('https://github.com/flutter/atom-flutter/issues/new?' + `body=${utils.uriEncodeComponent(description)}`);
      }, dart.dynamic, [core.String]));
    }
  }
  GettingStarted[dart.implements] = () => [disposable.Disposable];
  dart.setSignature(GettingStarted, {
    constructors: () => ({GettingStarted: [GettingStarted, []]}),
    methods: () => ({
      dispose: [dart.void, []],
      [_gettingStarted]: [dart.void, [atom.AtomEvent]],
      [_handleSendFeedback]: [dart.void, [atom.AtomEvent]]
    })
  });
  function getSystemDescription() {
    let atomVer = atom.atom.getVersion();
    let os = dart.notNull(process.isMac) ? 'macos' : process.process.platform;
    return dart.as(state.atomPackage.getPackageVersion().then(dart.fn(pluginVer => {
      let hasFlutterSdk = atom.atom.config.getValue('flutter.flutterRoot') != null;
      let description = `\n\nAtom ${atomVer}, flutter plugin ${pluginVer}`;
      if (!dart.notNull(hasFlutterSdk)) {
        description = dart.notNull(description) + ' (no flutter sdk configured)';
      }
      description = dart.notNull(description) + `, running on ${os}.`;
      return description;
    }, dart.dynamic, [core.String])), async.Future$(core.String));
  }
  dart.fn(getSystemDescription, async.Future$(core.String), []);
  // Exports:
  exports.GettingStarted = GettingStarted;
  exports.getSystemDescription = getSystemDescription;
});
//# sourceMappingURL=getting_started.js.map