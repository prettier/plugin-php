<?php

#[AsCommand(name: 'app:insertions:autorenew', description: 'Automatically applies a new IO for carriers with an IO marked auto-renew')]
class ApplyAutoRenewInsertionCommand extends Command
{
    #[ORM\Column(type: 'string', length: 255, nullable: true, options: ['comment' => 'A long enough comment to break'])]
    public ?string $description = null;

    #[ORM\Id, ORM\GeneratedValue(strategy: 'CUSTOM'), ORM\CustomIdGenerator(class: SomeVeryLongGeneratorClassName::class)]
    public int $id;

    #[Short, Other]
    public const int FLAG = 1;

    #[Route('/api/insertions/{id}/auto-renew', name: 'api_insertions_auto_renew', methods: ['POST'])]
    public function apply(
        #[MapRequestPayload(acceptFormat: 'json', validationGroups: ['create', 'auto-renew'], serializationContext: [])] AutoRenewRequest $request,
        #[Short] int $id,
    ): void {
        $fn = #[Pure] function () {};
        $long = #[SomeAttribute(first: 'aaaaaaaaaaaaaaaaaaaa', second: 'bbbbbbbbbbbbbbbbbbbbbb', third: 'cccc')] function () {};
        $anon = new #[Lazy, Title('Staff')] class extends Component {};
    }
}

enum Suit: string
{
    #[Description(text: 'The suit of hearts, which is one of the four suits in a standard deck of cards')]
    case Hearts = 'H';
}
