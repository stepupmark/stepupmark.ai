export function meta() {
  return [
    { title: "About · StepUpMark.AI" },
    {
      name: "description",
      content:
        "StepUpMark.AI is an AI creative suite that generates images, video, code, voice and presentations — every asset built search-ready from the start.",
    },
  ];
}

export default function AboutRoute() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-balance">About StepUpMark.AI</h1>

      <p className="text-pretty text-muted-foreground">
        StepUpMark.AI is an AI creative suite that brings image, video, code, voice and presentation
        generation into one workspace. Instead of moving work between a dozen single-purpose tools,
        a team can go from a first prompt to a finished asset in the same place.
      </p>

      <p className="text-pretty text-muted-foreground">
        What sets the platform apart is that every asset is built search-ready. SEO metadata is
        attached from the moment something is generated, so the work is discoverable without a
        separate optimization pass and an online presence grows as a side effect of creating.
      </p>

      <p className="text-pretty text-muted-foreground">
        We are an independent AI studio, associated with IIT Patna and Octo Spaces and a member of
        the NVIDIA partner network. The company is registered in Hyderabad, India.
      </p>

      <p className="text-pretty text-muted-foreground">
        Questions or partnership enquiries:{" "}
        <a
          href="mailto:contact@stepupmark.ai"
          className="font-medium text-foreground underline underline-offset-4"
        >
          contact@stepupmark.ai
        </a>
        .
      </p>
    </div>
  );
}
