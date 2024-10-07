"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { InfoIcon } from "lucide-react"

interface InfoTooltipProps {
    name: string;
    content: string;
}

const InfoToolTip = ({ name, content }: InfoTooltipProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const triggerRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        const handleScroll = () => {
            setIsOpen(false)
        }
        document.addEventListener('click', handleOutsideClick)
        window.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('click', handleOutsideClick)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleInteraction = (event: React.MouseEvent | React.TouchEvent) => {
        if (isMobile) {
            setIsOpen(!isOpen)
        }
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger
                className="hover:border-b hover:font-bold cursor-pointer items-center w-[120px] max-w-min lg:max-w-fit flex-shrink-0 text-ellipsis whitespace-nowrap overflow-hidden"
                asChild
            >
                <span
                    ref={triggerRef}
                    className="cursor-pointer flex items-center w-full"
                    onClick={handleInteraction}
                    onMouseEnter={() => !isMobile && setIsOpen(true)}
                    onMouseLeave={() => !isMobile && setIsOpen(false)}
                >
                    <span className="truncate">{name}</span>
                    <InfoIcon className="h-4 w-4 ml-1 flex-shrink-0" />
                    <span className="sr-only">Show information</span>
                </span>
            </PopoverTrigger>
            <PopoverContent>
                <p><span className='font-bold'>{name}</span>: {content}</p>
            </PopoverContent>
        </Popover>
    )
}

export { InfoToolTip }