import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const serviceGroups = [
  {
    title: 'Electrical Performance Tests',
    services: [
      {
        name: 'Conductor Resistance',
        description:
          'Measurement of DC resistance to verify conductor quality and cross-sectional area compliance.',
      },
      {
        name: 'Insulation Resistance',
        description:
          'Testing insulation integrity to ensure safety and prevent electrical leakage.',
      },
      {
        name: 'Voltage Withstand Test',
        description:
          'High voltage testing to verify insulation can withstand specified voltage levels.',
      },
      {
        name: 'Partial Discharge Test',
        description:
          'Detection of partial discharge activity in insulation systems for quality assurance.',
      },
    ],
  },
  {
    title: 'Mechanical & Physical Tests',
    services: [
      {
        name: 'Tensile Strength & Elongation',
        description:
          'Evaluation of conductor and insulation mechanical properties under stress.',
      },
      {
        name: 'Flexibility & Bending',
        description:
          'Testing cable flexibility and resistance to repeated bending cycles.',
      },
      {
        name: 'Impact & Crush Tests',
        description:
          'Assessment of cable durability under mechanical stress and impact conditions.',
      },
      {
        name: 'Dimensional Verification',
        description:
          'Precise measurement of cable dimensions, thickness, and cross-sectional area.',
      },
    ],
  },
  {
    title: 'Material & Insulation Analysis',
    services: [
      {
        name: 'Thermal Aging Tests',
        description:
          'Evaluation of insulation performance under elevated temperature conditions.',
      },
      {
        name: 'Hot Set Test',
        description:
          'Assessment of insulation deformation resistance at high temperatures.',
      },
      {
        name: 'Cold Bend Test',
        description:
          'Testing cable flexibility and insulation integrity at low temperatures.',
      },
      {
        name: 'Material Composition',
        description:
          'Chemical analysis to verify material composition and purity standards.',
      },
    ],
  },
  {
    title: 'Compliance & Certification',
    services: [
      {
        name: 'IS Standards Testing',
        description:
          'Complete testing as per Indian Standards (IS 694, IS 1554, etc.) for certification.',
      },
      {
        name: 'IEC Standards Testing',
        description:
          'International Electrotechnical Commission (IEC) standard compliance testing.',
      },
      {
        name: 'Custom Protocol Testing',
        description:
          'Specialized testing protocols designed to meet specific customer requirements.',
      },
      {
        name: 'Type Testing & Routine Testing',
        description:
          'Comprehensive type approval and routine production testing services.',
      },
    ],
  },
];

export default function ServiceGroups() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="space-y-16">
          {serviceGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
                {group.title}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {group.services.map((service, serviceIndex) => (
                  <Card key={serviceIndex} className="transition-shadow hover:shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
