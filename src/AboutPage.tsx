import Layout from './components/Layout'

export default function AboutPage() {
  return (
    <Layout>

      <div id="content">
        <div className="org-src-container">
          <p>
            I'm the CTO and a Research Partner at <a href="https://paradigm.xyz">Paradigm</a>,
            a crypto focused investment firm in San Francisco.
          </p>
          
          <h2>Research Interests</h2>
          <ul>
            <li>Proof of Stake security</li>
            <li>Modular Blockchains</li>
            <li>MEV (Maximum Extractable Value)</li>
            <li>Zero Knowledge Proofs</li>
          </ul>

          <h2>Engineering Interests</h2>
          <ul>
            <li>Building large scale robust data ingestion & transformation pipelines</li>
            <li>High-performance blockchain infrastructure</li>
            <li>Developer tools and frameworks</li>
            <li>Rust programming language</li>
          </ul>

          <h2>Background</h2>
          <p>
            I've been working in the crypto space since 2017, focusing on Ethereum infrastructure
            and tooling. I'm a strong advocate for open source software and have contributed to
            numerous projects in the ecosystem.
          </p>

          <p>
            If you find these topics interesting, we are <a href="mailto:georgios@paradigm.xyz">hiring</a> in 
            internal engineering roles and across the <a href="https://jobs.paradigm.xyz/">portfolio</a>. 
            I'd love to see your resume and/or one cool thing you've built on the internet that you're proud of.
          </p>
        </div>
      </div>
    </Layout>
  )
}