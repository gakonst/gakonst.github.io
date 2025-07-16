import Layout from './components/Layout'

export default function ContactPage() {
  return (
    <Layout>

      <div id="content">
        <div className="org-src-container">
          <h2>Get in Touch</h2>
          <p>I'm always interested in discussing new ideas and opportunities in the crypto space.</p>
          
          <h3>Professional</h3>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:georgios@paradigm.xyz">georgios@paradigm.xyz</a>
            </li>
            <li>
              <strong>Twitter:</strong>{' '}
              <a href="https://twitter.com/gakonst">@gakonst</a>
            </li>
            <li>
              <strong>GitHub:</strong>{' '}
              <a href="https://github.com/gakonst">gakonst</a>
            </li>
          </ul>

          <h3>Paradigm</h3>
          <p>
            <a href="https://paradigm.xyz">Paradigm</a><br />
            San Francisco, CA
          </p>

          <h3>Open to</h3>
          <ul>
            <li>Research collaborations</li>
            <li>Speaking engagements</li>
            <li>Advisory roles</li>
            <li>Open source contributions</li>
          </ul>

          <p>
            <em>For job opportunities at Paradigm, please visit our{' '}
            <a href="https://jobs.paradigm.xyz/">careers page</a>.</em>
          </p>
        </div>
      </div>
    </Layout>
  )
}