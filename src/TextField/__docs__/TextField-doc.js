// @flow

import React from 'react';
import { card, md } from 'corkboard';
import TextField from '../TextField';
import { ns } from '../../../.corkboard/cards';

ns('TextField');

card('FlowType',
md`
\`\`\`jsx
type Props = {
  hasError?: boolean, /* default: false */
  id: string,
  name?: string,
  onChange: (value: string) => void,
  placeholder?: string,
  type?: 'email' | 'password' | 'text' | 'url', /* default: text */
  value?: string,
};
\`\`\`
`
);

card('Options',
md`Shown to the right are some of the various options that \`TextField\` supports.
They will expand to fill the width of their parent container and the text within
is responsive.

\`\`\`jsx
<TextField id="email" placeholder="Email Address" type="email" />
\`\`\`
\`\`\`jsx
<TextField hasError id="lastName" name="lastName" />
\`\`\`
\`\`\`jsx
<TextField id="password" type="password" value="abcdef" />
\`\`\`
`,
atom => (
  <div className="px2">
    <div className="py2">
      <label htmlFor="email">With a placeholder</label>
      <TextField
        id="email"
        onChange={newValue => atom.reset({ placeholderValue: newValue })}
        placeholder="Email Address"
        value={atom.deref().placeholderValue}
        type="email"
      />
    </div>
    <div className="py2">
      <label htmlFor="name">With errors</label>
      <TextField
        hasError
        id="name"
        name="name"
        onChange={newValue => atom.reset({ errorValue: newValue })}
        value={atom.deref().errorValue}
      />
    </div>
  </div>
),
(atom) => {
  const state = atom.deref();
  return (
    <div className="px2">
      <div className="py2">
        <label htmlFor="password">With a password</label>
        <TextField
          id="password"
          type="password"
          value="abcdef"
          {...state}
          onChange={newValue => atom.set(props => ({
            ...props,
            value: newValue,
          }))}
        />
      </div>
    </div>
  );
});

card('Error Validation',
md`We currently don't handle client side validation. If you are doing any custom validation,
we strongly recommend adding \`novalidate\` to your form component to ensure the browser does
not display the default input validation messages in addition to your custom ones.`
);
