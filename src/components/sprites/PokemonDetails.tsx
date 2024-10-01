import Link from "next/link";
import { InfoToolTip } from "@/components/sprites";
import { genderRatios } from "@/lib/utils/constants";

interface Ability {
    real_name: string;
    real_description: string;
}

interface Evolution {
    id: string;
    name: string;
}

interface PokemonDetailsProps {
    category: string;
    height: number;
    weight: number;
    growthRate: string;
    catchRate: number;
    genderRatio: string;
    abilities: Ability[];
    hiddenAbilities: Ability[];
    evolvesFrom: Evolution[];
    evolvesTo: Evolution[];
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({
    category,
    height,
    weight,
    growthRate,
    catchRate,
    genderRatio,
    abilities,
    hiddenAbilities,
    evolvesFrom,
    evolvesTo,
}) => {
    return (
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 md:ml-2">
            <div className="col-span-full flex gap-6 lg:gap-8"></div>

            <div>
                <dt className="font-semibold text-muted-foreground">Category</dt>
                <dd>{category} Pokemon</dd>
            </div>

            <div>
                <dt className="font-semibold text-muted-foreground">Height</dt>
                <dd>{height / 10} m</dd>
            </div>

            <div>
                <dt className="font-semibold text-muted-foreground">Weight</dt>
                <dd>{weight / 10} kg</dd>
            </div>

            <div>
                <dt className="font-semibold text-muted-foreground">Growth Rate</dt>
                <dd>{growthRate}</dd>
            </div>

            <div>
                <dt className="font-semibold text-muted-foreground">Catch Rate</dt>
                <dd>{catchRate}</dd>
            </div>

            <div>
                <dt className="font-semibold text-muted-foreground">Gender Ratio</dt>
                <dd>{genderRatios[genderRatio as keyof typeof genderRatios]}</dd>
            </div>

            {evolvesFrom.length > 0 && (
                <div>
                    <dt className="font-semibold text-muted-foreground">Evolves From</dt>
                    <dd>
                        {evolvesFrom.map((evo) => (
                            <p key={evo.id}>
                                <span className="text-muted-foreground">#{evo.id} </span>
                                <Link rel="nofollow" prefetch={false} href={`/${evo.id}`} className="border-b-2 border-muted-foreground">
                                    {evo.name}
                                </Link>
                            </p>
                        ))}
                    </dd>
                </div>
            )}

            {evolvesTo.length > 0 && (
                <div>
                    <dt className="font-semibold text-muted-foreground">Evolves To</dt>
                    <dd>
                        {evolvesTo.map((evo) => (
                            <p key={evo.id}>
                                <span className="text-muted-foreground">#{evo.id} </span>
                                <Link rel="nofollow" prefetch={false} href={`/${evo.id}`} className="border-b-2 border-muted-foreground">
                                    {evo.name}
                                </Link>
                            </p>
                        ))}
                    </dd>
                </div>
            )}
            <div className="col-span-full grid grid-cols-2 lg:flex justify-start md:gap-14">

                <div className="lg:max-w-fit">
                    <dt className="font-semibold text-muted-foreground">Abilities:</dt>
                    <dd className="flex flex-wrap items-center gap-2">
                        {abilities.map((ability, index) => (
                            <InfoToolTip
                                key={index}
                                name={ability.real_name}
                                content={ability.real_description}
                            />
                        ))}
                    </dd>
                </div>
                <div>
                    <dt className="font-semibold text-muted-foreground">Hidden Abilities:</dt>
                    <dd className="flex flex-wrap items-center gap-2">
                        {hiddenAbilities.map((ability, index) => (
                            <InfoToolTip
                                key={index}
                                name={ability.real_name}
                                content={ability.real_description}
                            />
                        ))}
                    </dd>
                </div>
            </div>
        </dl>
    );
};

export { PokemonDetails };
